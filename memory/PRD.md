# NavAir — Product Requirements Document

## 1. Original Problem Statement
Build a sleek, ultra-modern, premium landing page for **NavAir** — a brand of high-tech, affordable air purifiers. The page must use a dark theme, minimalist layouts, and neon/cyan accents. Target audience: tech-savvy individuals. Primary CTA: **"Explore the Future of Clean Air"**.

User-driven additions across the project:
- Pricing in **INR** under **₹7,000**, three tiers.
- **OTP-based pre-booking** flow (SMS) using **Twilio Verify** so visitors can reserve a unit by verifying their phone number.

## 2. Users / Personas
- **Indian urban professional, 25–40**, tech-curious, lives in a tier-1 city, conscious of air quality, looking for an affordable design-forward smart-home gadget.
- **Design-led shopper** who values aesthetics on par with engineering specs.

## 3. Architecture
- **Frontend**: React (CRA) + Tailwind CSS, dark theme, single landing page route at `/`.
  - Main file: `/app/frontend/src/pages/NavAirLanding.jsx`
  - Components: `Header`, `Hero`, `TrustStrip`, `Features` (bento grid), `Showcase`, `Specs`, `Pricing`, `PrebookModal` (OTP flow), `Waitlist`, `Footer`.
  - Icons: `@phosphor-icons/react`. Toasts: `sonner`. HTTP: `axios`.
- **Backend**: FastAPI + Motor (MongoDB async).
  - Main file: `/app/backend/server.py`
  - Twilio Python SDK (`twilio==9.10.9`) for Verify Service. Demo-mode fallback when `TWILIO_VERIFY_SID` is empty.
- **Database**: MongoDB (`DB_NAME` from env).
- **Env**: `/app/backend/.env` holds `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SID`. Frontend uses `REACT_APP_BACKEND_URL`.

## 4. Data Models
- **waitlist**: `{email, source, created_at}`
- **prebookings**: `{id, phone, product, name, created_at}`
- **otp_codes** (demo-mode only): `{phone, code, expires_at, attempts}`
- **otp_sends** (rate-limit log): `{phone, product, created_at, channel}`

## 5. API Endpoints (all prefixed with `/api`)
| Method | Path | Purpose |
|---|---|---|
| GET | `/waitlist/count` | Public count of waitlist signups |
| POST | `/waitlist` | Join waitlist (idempotent on email) — returns `position` |
| POST | `/prebook/send-otp` | Send 6-digit OTP via Twilio Verify (or demo) |
| POST | `/prebook/verify-otp` | Verify OTP & create prebooking |
| GET | `/prebook/status` | Total prebookings + Twilio flag |
| GET | `/` | Health |

Rate limit: max **5 OTP sends per phone per hour**.

## 6. Implemented (Changelog)

### 2026-02-08 — OTP Pre-booking Live
- ✅ Integrated Twilio Verify (`TWILIO_VERIFY_SID=VA1ecbae...`) — **LIVE SMS**.
- ✅ Added `/api/prebook/send-otp`, `/api/prebook/verify-otp`, `/api/prebook/status` endpoints with demo-mode fallback.
- ✅ Built `PrebookModal` (3-step: phone → OTP → success) with name capture, +91 prefix, resend countdown, demo-code preview banner.
- ✅ Wired each Pricing card's `Reserve` CTA to open modal with selected product (`NavAir Mini` / `01` / `Pro`).
- ✅ Modal remounts cleanly on reopen via `{open && <PrebookModal key=...>}` pattern (avoids stale state).
- ✅ Fixed minor backend issues: duplicate waitlist now returns existing position; demo verify only increments `attempts` on failure.
- ✅ Tested end-to-end via `testing_agent_v3_fork` (pytest backend + Playwright frontend) — 100% pass.

### Earlier
- ✅ Landing page sections: Hero, TrustStrip marquee, Features bento grid, Showcase, Specs table, Pricing, Waitlist, Footer.
- ✅ Pricing updated to INR (₹3,499 / ₹4,999 / ₹6,999).
- ✅ Waitlist email capture with duplicate guard.

## 7. Backlog / Roadmap

### P0
- _(none currently)_

### P1
- **Admin dashboard** to view waitlist + prebookings (CSV export).
- **Email confirmation** on successful pre-booking (Resend or SES).
- **Stripe / Razorpay deposit** to convert pre-booking into ₹500 advance.

### P2
- Localization (English ↔ Hindi).
- A/B test hero copy variants.
- Add 3D hero product render (Three.js / Spline).
- Capture UTM source on waitlist & prebooking entries.

## 8. Known Mocked / Demo Items
- None. Twilio is **LIVE**. Demo mode only triggers if `TWILIO_VERIFY_SID` is cleared.

## 9. Test Credentials
See `/app/memory/test_credentials.md`.
