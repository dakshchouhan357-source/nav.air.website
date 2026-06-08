"""Backend tests for NavAir API.

Covers:
- Waitlist endpoints (count, create, duplicate, invalid email)
- Pre-book OTP endpoints (send, verify) -- requires DEMO MODE
- Rate limiting on send-otp
- Prebook status endpoint
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://premium-purifier.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ----------------------- Waitlist tests -----------------------

class TestWaitlist:
    def test_count_endpoint(self, session):
        r = session.get(f"{API}/waitlist/count", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "count" in data
        assert isinstance(data["count"], int)

    def test_create_and_duplicate_waitlist(self, session):
        email = f"TEST_{uuid.uuid4().hex[:10]}@example.com"
        # First insert
        r1 = session.post(f"{API}/waitlist", json={"email": email, "source": "test"}, timeout=15)
        assert r1.status_code == 200, r1.text
        d1 = r1.json()
        assert d1["ok"] is True
        assert d1["already_joined"] is False
        assert "position" in d1
        assert isinstance(d1["position"], int)

        # Duplicate
        r2 = session.post(f"{API}/waitlist", json={"email": email.upper(), "source": "test"}, timeout=15)
        assert r2.status_code == 200, r2.text
        d2 = r2.json()
        assert d2["ok"] is True
        assert d2["already_joined"] is True

    def test_invalid_email(self, session):
        r = session.post(f"{API}/waitlist", json={"email": "not-an-email", "source": "test"}, timeout=15)
        assert r.status_code in (400, 422), r.text


# ----------------------- Prebook status -----------------------

class TestPrebookStatus:
    def test_status_endpoint(self, session):
        r = session.get(f"{API}/prebook/status", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "total" in data
        assert "twilio_enabled" in data
        assert isinstance(data["total"], int)
        assert isinstance(data["twilio_enabled"], bool)


# ----------------------- Send OTP (mode-aware) -----------------------

class TestSendOtp:
    """Tests send-otp in whatever mode the backend is currently running.

    In demo mode (TWILIO_VERIFY_SID empty), response will include `demo_code`.
    In live mode, channel will be 'sms' (or 'demo' if twilio_client is None) and demo_code absent.
    """

    def test_invalid_phone(self, session):
        r = session.post(f"{API}/prebook/send-otp", json={"phone": "abc"}, timeout=15)
        assert r.status_code == 400, r.text

    def test_send_otp_ok(self, session):
        # Use a unique-ish India number to avoid colliding with rate limits across runs
        rand_suffix = f"{uuid.uuid4().int % 10**9:09d}"
        phone = f"+91{rand_suffix[:10]}"
        r = session.post(f"{API}/prebook/send-otp", json={"phone": phone, "product": "TEST"}, timeout=30)
        # Could be 200 OK or 502 if twilio rejects the number; both are acceptable indicators
        assert r.status_code in (200, 502), r.text
        if r.status_code == 200:
            d = r.json()
            assert d.get("ok") is True
            assert d.get("channel") in ("sms", "demo")


# ----------------------- Demo-mode E2E (requires TWILIO_VERIFY_SID="") -----------------------

class TestDemoModeOtpE2E:
    """These tests are only meaningful in DEMO mode. They will be skipped if
    /api/prebook/status reports twilio_enabled=True."""

    @pytest.fixture(autouse=True)
    def _ensure_demo_mode(self, session):
        r = session.get(f"{API}/prebook/status", timeout=15)
        if r.status_code != 200 or r.json().get("twilio_enabled"):
            pytest.skip("Backend in LIVE Twilio mode; skipping demo E2E tests")

    def test_demo_send_and_verify(self, session):
        rand_suffix = f"{uuid.uuid4().int % 10**9:09d}"
        phone = f"+91{rand_suffix[:10]}"
        r = session.post(f"{API}/prebook/send-otp", json={"phone": phone, "product": "NavAir 01"}, timeout=15)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d.get("ok") is True
        demo_code = d.get("demo_code")
        assert demo_code and len(demo_code) == 6, f"Expected demo_code in demo mode, got: {d}"

        # Wrong code -> 400
        r_wrong = session.post(f"{API}/prebook/verify-otp", json={"phone": phone, "code": "000000", "name": "TestUser", "product": "NavAir 01"}, timeout=15)
        # Could be 400 (wrong) or 400 (incorrect)
        assert r_wrong.status_code == 400, r_wrong.text

        # Correct code -> success
        r_ok = session.post(f"{API}/prebook/verify-otp", json={"phone": phone, "code": demo_code, "name": "TestUser", "product": "NavAir 01"}, timeout=15)
        # NOTE: wrong attempt above increments attempts counter; should still allow correct verify
        assert r_ok.status_code == 200, r_ok.text
        ok = r_ok.json()
        assert ok.get("verified") is True
        assert "booking_id" in ok
        assert isinstance(ok.get("position"), int)


# ----------------------- Rate limiting -----------------------

class TestRateLimit:
    @pytest.fixture(autouse=True)
    def _ensure_demo_mode(self, session):
        # Only run in demo mode to avoid burning real Twilio quota
        r = session.get(f"{API}/prebook/status", timeout=15)
        if r.status_code != 200 or r.json().get("twilio_enabled"):
            pytest.skip("Backend in LIVE Twilio mode; skipping rate-limit test")

    def test_rate_limit_429(self, session):
        rand_suffix = f"{uuid.uuid4().int % 10**9:09d}"
        phone = f"+91{rand_suffix[:10]}"
        statuses = []
        for i in range(6):
            r = session.post(f"{API}/prebook/send-otp", json={"phone": phone, "product": "RL"}, timeout=15)
            statuses.append(r.status_code)
        # The 6th call (i.e. once recent >= 5) should return 429
        assert 429 in statuses, f"Expected 429 in {statuses}"
