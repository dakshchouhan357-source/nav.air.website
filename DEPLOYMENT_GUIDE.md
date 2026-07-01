# 🚀 NavAir Deployment Guide (Zero-Coding Friendly)

Stack: **GitHub → Vercel (frontend) + Render (backend) + MongoDB Atlas (database) + Gmail SMTP (emails)**

All services have FREE tiers. Total monthly cost = ₹0.

---

## STEP 1️⃣ — MongoDB Atlas (Database) — 5 min

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google
3. Click **"Create"** → choose **M0 (FREE forever)**
4. Choose any region (Mumbai recommended for India)
5. Click **"Create Deployment"**
6. **Username:** `navair_admin` → **Password:** click "Autogenerate" + COPY IT somewhere safe
7. Click **"Create Database User"**
8. Network Access → **"Add IP Address"** → click **"Allow Access from Anywhere"** (0.0.0.0/0)
9. Click **"Connect"** → **"Drivers"** → copy the connection string. It looks like:
   ```
   mongodb+srv://navair_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
10. **Replace `<password>`** with the actual password you copied
11. **Save this full string** — you'll paste it in Render

---

## STEP 2️⃣ — Render (Backend) — 10 min

1. Go to https://render.com → sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your **`nav.air.website`** GitHub repo
4. Render will auto-detect `render.yaml` and configure everything. If it doesn't, set manually:
   - **Name:** `navair-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - **Plan:** Free
5. Scroll to **"Environment Variables"** and add ALL of these:

   | Key | Value |
   |---|---|
   | `MONGO_URL` | (paste your Atlas string from Step 1) |
   | `DB_NAME` | `navair` |
   | `CORS_ORIGINS` | `*` *(change after you have Vercel URL)* |
   | `GMAIL_USER` | `dakshchouhan357@gmail.com` |
   | `GMAIL_APP_PASSWORD` | `gbub evgv nlxz powq` |
   | `BRAND_NAME` | `NavAir` |
   | `BRAND_CONTACT_EMAIL` | `dakshchouhan357@gmail.com` |
   | `TWILIO_ACCOUNT_SID` | (your Twilio SID — optional, only if you want SMS) |
   | `TWILIO_AUTH_TOKEN` | (your Twilio token) |
   | `TWILIO_VERIFY_SID` | (your Twilio Verify Service SID) |

6. Click **"Create Web Service"**
7. Wait ~5 min for build. When done, copy your backend URL — looks like:
   ```
   https://navair-backend.onrender.com
   ```
8. **Save this URL** — you'll paste it in Vercel

> ⚠️ **Render free tier sleeps** after 15 min of no traffic. First request after sleep takes ~30s to wake up. This is normal.

---

## STEP 3️⃣ — Vercel (Frontend) — 5 min

1. Go to https://vercel.com → sign in with GitHub
2. Import your **`nav.air.website`** repo
3. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** *(leave default)*
   - **Output Directory:** `build`
4. Scroll to **"Environment Variables"** — add:

   | Key | Value |
   |---|---|
   | `REACT_APP_BACKEND_URL` | `https://navair-backend.onrender.com` *(from Step 2)* |

5. Click **"Deploy"**
6. Wait ~2 min. Copy your live URL — looks like:
   ```
   https://nav-air-website.vercel.app
   ```

---

## STEP 4️⃣ — Lock CORS (Security) — 2 min

1. Go back to **Render → your service → Environment**
2. Edit `CORS_ORIGINS` → change from `*` to your Vercel URL:
   ```
   https://nav-air-website.vercel.app
   ```
3. Click **"Save Changes"** → Render auto-redeploys

---

## ✅ TEST YOUR LIVE SITE

1. Open `https://nav-air-website.vercel.app`
2. Click **"Pre-book Now"**
3. Enter your email → verify OTP arrives
4. 🎉 You're LIVE!

---

## 🆘 TROUBLESHOOTING

| Problem | Fix |
|---|---|
| Vercel build fails with `ERESOLVE` | Already fixed via `.npmrc` file. Re-deploy. |
| OTP email not arriving | Check spam. Verify `GMAIL_APP_PASSWORD` in Render env vars. |
| Pre-book button does nothing | Check browser console (F12). Likely `REACT_APP_BACKEND_URL` wrong or CORS blocked. |
| Render says "Application failed to respond" | Backend cold-started. Wait 30s, refresh. |
| Mongo connection error | Check Atlas → Network Access allows `0.0.0.0/0`. |

---

## 🔄 UPDATING YOUR SITE LATER

Any change pushed to GitHub `main` branch → **both Vercel and Render auto-redeploy**. Zero manual work.

---

Made with ❤️ — your website is yours forever.
