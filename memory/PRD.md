# NavAir — Product Requirements Document

## 1. Original Problem Statement
Build a sleek, ultra-modern, premium landing page for **NavAir**.

**Brand pivot (Feb 2026):** NavAir is now a **premium technology & lifestyle brand** focused on productivity, comfort, and modern living. Primary product line is **Keyboard & Mouse Combos**. The air-purifier series is now a **"Coming Soon" future product line** (no purchases enabled). Dark theme, neon/cyan + emerald-green accents, glassmorphism, premium animations.

## 2. Users / Personas
- **Tech-savvy professional / creator, 22–40** — values productivity, design, and premium materials.
- **Student or office worker** looking for a reliable wireless K&M combo without overspending.
- **Early adopter** interested in NavAir's future ecosystem (air purifier, smart devices, mechanical KBs, gaming mouse).

## 3. Architecture
- **Frontend:** React (CRA) + Tailwind CSS. Single-page landing at `/`.
  - File: `/app/frontend/src/pages/NavAirLanding.jsx` (~1.8k lines).
  - Sections: Header → Hero → TrustStrip → Features → Showcase → Comparison → Pricing (id=products) → AirPurificationSeries → Roadmap → About → Faq → Footer.
  - PrebookModal (3-step OTP) handles both Email + SMS channels.
- **Backend:** FastAPI + Motor (MongoDB async).
  - File: `/app/backend/server.py`.
  - Twilio Verify (SMS OTP) + Gmail SMTP (Email OTP).
- **Database:** MongoDB.
- **Env:** `/app/backend/.env` (TWILIO_*, GMAIL_USER, GMAIL_APP_PASSWORD, BRAND_NAME, BRAND_CONTACT_EMAIL).

## 4. Product Lineup
| Product | Price | Badge |
|---|---|---|
| NavAir Essential K&M Combo | ₹1,799 | Best Value |
| NavAir Performance K&M Combo | ₹2,499 | Most Popular (highlighted) |
| NavAir Pro K&M Combo | ₹3,299 | Flagship |
| Air Purification Series | — | Future Product Line / Coming Soon |

## 5. Data Models
- **waitlist:** `{email, source, created_at}` — duplicate-safe; returns position.
- **prebookings:** `{id, email|phone, product, name, channel, created_at}`.
- **otp_codes** (demo-mode): `{phone|email, code, expires_at, attempts}`.
- **otp_sends** (rate-limit log): `{phone|email, product, created_at, channel}`.

## 6. API Endpoints (`/api` prefix)
| Method | Path | Purpose |
|---|---|---|
| GET | `/waitlist/count` | Public count |
| POST | `/waitlist` | Join waitlist (idempotent on email + returns position) |
| POST | `/prebook/send-otp` | Send SMS OTP (Twilio Verify or demo) |
| POST | `/prebook/verify-otp` | Verify SMS OTP & create prebooking |
| POST | `/prebook/send-email-otp` | Send Email OTP (Gmail SMTP or demo) |
| POST | `/prebook/verify-email-otp` | Verify Email OTP & create prebooking |
| GET | `/prebook/status` | Total + twilio_enabled + email_enabled |
| GET | `/` | Health |

Rate-limit: 5 OTP sends per phone/email per hour.

## 7. Implemented (Changelog)

### 2026-02-09 — Major Brand Pivot
- ✅ Repositioned NavAir from air-purifier brand → premium tech & lifestyle brand.
- ✅ New hero: "Premium tech for modern living"; emerald + cyan gradient.
- ✅ TrustStrip refreshed for tech brand keywords.
- ✅ Features bento rebuilt around 5 cards (Wireless / Comfort / Productivity / Reliability / Design).
- ✅ Showcase now features NavAir Performance K&M combo with image.
- ✅ Specs section → replaced with **Comparison Table** (3 columns × 6 rows, Most Popular highlighted).
- ✅ Pricing → **Products** section with 3 K&M combo cards + "Pre-Book Now" CTAs.
- ✅ New **AirPurificationSeries** section: future product line, emerald accents, "Notify Me" + "Join Waitlist" + "Learn More" buttons. No purchases.
- ✅ New **Roadmap** section: 5 future items (gaming mouse, mechanical KB, desk accessories, smart devices, air series "In Development").
- ✅ New **About** section: brand story + "Growing Ecosystem" sidebar.
- ✅ FAQ updated with 7 new tech-brand questions.
- ✅ Footer: products updated; nav.purify@gmail.com prominent; NO phone numbers.
- ✅ Header nav refreshed: Combos / Compare / Air Series / Roadmap / About / FAQ.
- ✅ Pre-book modal product names updated.
- ✅ Tested via `testing_agent_v3_fork` iteration 2 → 100% frontend & backend pass.

### 2026-02-08 — Email OTP added
- ✅ Gmail SMTP integration (from dakshchouhan357@gmail.com, reply-to nav.purify@gmail.com).
- ✅ New endpoints `/api/prebook/send-email-otp` + `/api/prebook/verify-email-otp`.
- ✅ Modal now has **Email / SMS** channel tabs (email default).
- ✅ FAQ section replaced old email-only waitlist below pricing.

### 2026-02-08 — Twilio OTP (SMS) live
- ✅ Twilio Verify wired with user's Verify Service SID.
- ✅ 3-step PrebookModal (input → OTP → success), demo-mode fallback.

### Earlier (pre-pivot)
- Hero, TrustStrip marquee, Features bento (air-purifier theme), Showcase, Specs, Pricing (₹3,499/₹4,999/₹6,999), Waitlist email capture.

## 8. Backlog / Roadmap

### P1
- **Admin dashboard:** view waitlist + prebookings (CSV export).
- **Email confirmation** after successful pre-booking (post-OTP).
- **Stripe / Razorpay** ₹500 deposit to harden pre-booking conversion.

### P2
- **Modular refactor**: split `NavAirLanding.jsx` (1.8k lines) into `src/pages/navair/*` sub-components.
- Localization (EN ↔ HI).
- A/B test hero copy.
- 3D product render (Three.js / Spline) for K&M combo.
- UTM source capture on every form.

## 9. Known Mocked / Demo Items
- None. Twilio + Gmail both LIVE.

## 10. Test Credentials
See `/app/memory/test_credentials.md`.
