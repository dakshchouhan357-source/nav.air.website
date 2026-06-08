from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import random
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

TWILIO_ACCOUNT_SID = os.environ.get('TWILIO_ACCOUNT_SID', '').strip()
TWILIO_AUTH_TOKEN = os.environ.get('TWILIO_AUTH_TOKEN', '').strip()
TWILIO_VERIFY_SID = os.environ.get('TWILIO_VERIFY_SID', '').strip()
TWILIO_ENABLED = bool(TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN and TWILIO_VERIFY_SID)

twilio_client = None
if TWILIO_ENABLED:
    try:
        from twilio.rest import Client as TwilioClient
        twilio_client = TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    except Exception as exc:  # noqa: BLE001
        logging.getLogger(__name__).warning("Twilio init failed: %s", exc)
        twilio_client = None


app = FastAPI()
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class WaitlistEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    source: Optional[str] = "hero"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class WaitlistCreate(BaseModel):
    email: EmailStr
    source: Optional[str] = "hero"


@api_router.get("/")
async def root():
    return {"message": "NavAir API is breathing"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/waitlist")
async def join_waitlist(payload: WaitlistCreate):
    email_lower = payload.email.lower()
    existing = await db.waitlist.find_one({"email": email_lower})
    if existing:
        return {
            "ok": True,
            "already_joined": True,
            "message": "You're already on the list. We'll be in touch soon.",
        }
    entry = WaitlistEntry(email=email_lower, source=payload.source)
    doc = entry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.waitlist.insert_one(doc)
    count = await db.waitlist.count_documents({})
    return {
        "ok": True,
        "already_joined": False,
        "message": "Welcome aboard. You're on the list.",
        "position": count,
    }


@api_router.get("/waitlist/count")
async def waitlist_count():
    count = await db.waitlist.count_documents({})
    return {"count": count}


# ============================================================
# OTP-BASED PRE-BOOKING (Twilio Verify with demo fallback)
# ============================================================
PHONE_RE = re.compile(r"^\+\d{8,15}$")


def _normalize_phone(raw: str) -> str:
    raw = (raw or "").strip().replace(" ", "").replace("-", "")
    if not raw:
        raise HTTPException(status_code=400, detail="Phone number is required.")
    if not raw.startswith("+"):
        # default to India (+91) when no country code is supplied
        digits = re.sub(r"\D", "", raw)
        if len(digits) == 10:
            raw = "+91" + digits
        else:
            raw = "+" + digits
    if not PHONE_RE.match(raw):
        raise HTTPException(status_code=400, detail="Invalid phone number format. Use E.164 e.g. +919876543210.")
    return raw


class SendOtpRequest(BaseModel):
    phone: str
    product: Optional[str] = None


class VerifyOtpRequest(BaseModel):
    phone: str
    code: str
    product: Optional[str] = None
    name: Optional[str] = None


@api_router.post("/prebook/send-otp")
async def send_otp(payload: SendOtpRequest):
    phone = _normalize_phone(payload.phone)

    # Simple rate limit: max 5 sends per phone per hour
    one_hour_ago = datetime.now(timezone.utc) - timedelta(hours=1)
    recent = await db.otp_sends.count_documents({
        "phone": phone,
        "created_at": {"$gte": one_hour_ago.isoformat()},
    })
    if recent >= 5:
        raise HTTPException(status_code=429, detail="Too many OTP requests. Please try again later.")

    demo_code: Optional[str] = None

    if twilio_client and TWILIO_VERIFY_SID:
        try:
            twilio_client.verify.v2.services(TWILIO_VERIFY_SID).verifications.create(
                to=phone, channel="sms"
            )
        except Exception as exc:  # noqa: BLE001
            logger.error("Twilio send-otp failed: %s", exc)
            raise HTTPException(status_code=502, detail="Could not send OTP. Please try again.")
    else:
        # Demo / dev mode: generate a code and persist it for later verification
        demo_code = f"{random.randint(0, 999999):06d}"
        expires = datetime.now(timezone.utc) + timedelta(minutes=10)
        await db.otp_codes.update_one(
            {"phone": phone},
            {"$set": {
                "phone": phone,
                "code": demo_code,
                "expires_at": expires.isoformat(),
                "attempts": 0,
            }},
            upsert=True,
        )

    await db.otp_sends.insert_one({
        "phone": phone,
        "product": payload.product,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "channel": "twilio" if twilio_client else "demo",
    })

    response = {"ok": True, "phone": phone, "channel": "sms" if twilio_client else "demo"}
    if demo_code is not None:
        # Surface the code so the user can preview the flow without Twilio.
        response["demo_code"] = demo_code
    return response


@api_router.post("/prebook/verify-otp")
async def verify_otp(payload: VerifyOtpRequest):
    phone = _normalize_phone(payload.phone)
    code = (payload.code or "").strip()
    if not code.isdigit() or len(code) not in (4, 6):
        raise HTTPException(status_code=400, detail="Enter the 6-digit code from your SMS.")

    verified = False

    if twilio_client and TWILIO_VERIFY_SID:
        try:
            check = twilio_client.verify.v2.services(TWILIO_VERIFY_SID).verification_checks.create(
                to=phone, code=code
            )
            verified = (getattr(check, "status", "") == "approved")
        except Exception as exc:  # noqa: BLE001
            logger.error("Twilio verify-otp failed: %s", exc)
            raise HTTPException(status_code=502, detail="Could not verify OTP. Please try again.")
    else:
        record = await db.otp_codes.find_one({"phone": phone})
        if not record:
            raise HTTPException(status_code=400, detail="No OTP request found. Send a new code.")
        expires_at = record.get("expires_at")
        if expires_at and datetime.fromisoformat(expires_at) < datetime.now(timezone.utc):
            raise HTTPException(status_code=400, detail="OTP expired. Please request a new code.")
        if record.get("attempts", 0) >= 5:
            raise HTTPException(status_code=429, detail="Too many attempts. Request a new code.")
        verified = (record.get("code") == code)
        await db.otp_codes.update_one(
            {"phone": phone}, {"$inc": {"attempts": 1}}
        )

    if not verified:
        raise HTTPException(status_code=400, detail="Incorrect code. Please try again.")

    # Persist the pre-booking
    booking_id = str(uuid.uuid4())
    existing = await db.prebookings.find_one({"phone": phone, "product": payload.product})
    if not existing:
        await db.prebookings.insert_one({
            "id": booking_id,
            "phone": phone,
            "product": payload.product or "NavAir 01",
            "name": payload.name,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
    else:
        booking_id = existing.get("id", booking_id)

    # Clean up any demo code
    await db.otp_codes.delete_one({"phone": phone})

    total = await db.prebookings.count_documents({})
    return {
        "ok": True,
        "verified": True,
        "booking_id": booking_id,
        "position": total,
        "message": "Your pre-booking is confirmed.",
    }


@api_router.get("/prebook/status")
async def prebook_status():
    total = await db.prebookings.count_documents({})
    return {"total": total, "twilio_enabled": bool(twilio_client)}



app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
