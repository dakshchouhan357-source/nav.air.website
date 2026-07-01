# NAV AIR Backend API

Node.js Express backend for NAV AIR e-commerce order system.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
```bash
cd backend
npm install
```

2. **Create .env file**
```bash
cp .env.example .env
```

3. **Configure email settings** (see below)

4. **Start server**
```bash
npm run dev
# or
npm start
```

Server will run on `http://localhost:5000`

---

## 📧 Email Configuration

### Option 1: Gmail (Free & Easy)

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification if not already enabled
3. Generate App Password:
   - Click "App passwords"
   - Select "Mail" and "Windows Computer" (or your device)
   - Copy the 16-character password
4. In `.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_16_char_app_password
SMTP_FROM=your_email@gmail.com
```

### Option 2: SendGrid (Professional)

1. Sign up at https://sendgrid.com
2. Create API Key in Settings → API Keys
3. In `.env`:
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your_sendgrid_api_key
SMTP_FROM=your_verified_sender@domain.com
```

### Option 3: Any SMTP Provider

Just configure with your provider's SMTP settings in `.env`

---

## 📋 Environment Variables

```bash
# Server
PORT=5000
NODE_ENV=development

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=your_email@gmail.com

# Business
BUSINESS_EMAIL=air.navpure@gmail.com

# Frontend
FRONTEND_URL=http://localhost:3000
```

---

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```
Response: Server status

### Create Order
```
POST /api/orders/create
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "mobile": "9876543210",
  "email": "john@example.com",
  "address": "123 Main Street",
  "landmark": "Near Park",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "product": "NAV AIR Bloom",
  "quantity": 1,
  "notes": "Leave at door"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Order placed successfully!",
  "orderId": "ORD-1719846828354-A1B2C3D4",
  "timestamp": "2024-07-01T10:30:28.354Z"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Mobile number must be 10 digits"]
}
```

---

## 🚢 Deployment

### Deploy to Vercel (Free)

1. Push backend to GitHub in `/backend` folder
2. Go to https://vercel.com
3. Import project
4. Add environment variables
5. Deploy

### Deploy to Render (Free)

1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set root directory: `backend`
5. Add environment variables
6. Deploy

### Deploy to Railway (Free)

1. Go to https://railway.app
2. Create new project
3. Deploy from GitHub
4. Add environment variables
5. Deploy

---

## 📊 Features

✅ Order validation
✅ Email to business
✅ Confirmation email to customer
✅ Error handling
✅ CORS enabled
✅ Beautiful HTML emails
✅ Production ready

---

## 🐛 Troubleshooting

### "Email service error"
- Check SMTP credentials
- Verify Gmail App Password (not regular password)
- Check firewall/network access

### "Port 5000 already in use"
```bash
# Change PORT in .env
PORT=5001
```

### "CORS error from frontend"
- Check FRONTEND_URL in `.env`
- Ensure frontend is sending to correct backend URL

---

## 📞 Support

For issues, check:
- Backend logs (console output)
- Email configuration
- Network connectivity

---

**Made with ❤️ for NAV AIR**