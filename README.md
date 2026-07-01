# 🌸 NAV AIR - Premium Air Quality Solutions

Beautiful, modern e-commerce website for NAV AIR products with complete order system.

## 🎨 Features

### Frontend
- ✨ Cute, modern design with soft pastel colors
- 🎯 Glassmorphic UI components
- 📱 Fully responsive (mobile, tablet, desktop)
- 🛍️ Product showcase (NAV AIR Bloom, NAV AIR Glow)
- 🔜 Air Purifiers "Coming Soon" section
- 📋 Simple 1-step order form
- ✅ Real-time form validation
- 🎉 Order success confirmation

### Backend
- 📧 Email notifications to business & customer
- ✅ Complete order validation
- 🔒 Secure data handling
- 🚀 Production-ready API
- 📊 Order logging and tracking

## 🚀 Quick Start

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Visit `http://localhost:3000`

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure email settings in .env
npm run dev
```

Server runs on `http://localhost:5000`

## 📋 Project Structure

```
nav.air.website/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── NavAirLanding.jsx (Main page)
│   │   │   └── OrderNowModal.jsx (Order form)
│   │   ├── services/
│   │   │   └── orderService.js (API integration)
│   │   ├── App.js
│   │   ├── App.css (Pastel theme)
│   │   └── index.js
│   ├── package.json
│   └── .env.local
│
├── backend/
│   ├── config/
│   │   └── email.js (Email setup)
│   ├── controllers/
│   │   └── orderController.js (Order logic)
│   ├── middleware/
│   │   └── validation.js (Input validation)
│   ├── routes/
│   │   └── orders.js (API routes)
│   ├── utils/
│   │   └── emailService.js (Email sending)
│   ├── server.js (Main server)
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── README.md
```

## 🎨 Design Colors

```
🌸 Blush Pink (#FFB3D9)
💜 Lavender (#E6D5F0)
🌿 Mint Green (#B2F2BB)
💙 Baby Blue (#B0E0E6)
🍑 Peach (#FFDBA4)
💜 Lilac (#C8A2D0)
🍨 Cream (#FFFDD0)
```

## 📧 Email Configuration

See `backend/README.md` for detailed email setup instructions.

### Quick: Gmail Setup

1. Enable 2FA on Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=your_email@gmail.com
```

## 🚢 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect to Vercel
3. Auto-deploys on push
4. Update `REACT_APP_BACKEND_URL` in environment variables

### Backend
Choose one:
- **Vercel** (serverless)
- **Render** (free tier)
- **Railway** (free tier)
- **Heroku** (paid)
- **AWS** (pay-as-you-go)

## 📱 Order Form Fields

1. **Full Name** - Required
2. **Mobile Number** - 10 digits, required
3. **Email Address** - Valid email, required
4. **Complete Address** - Required
5. **Landmark** - Optional
6. **City** - Required
7. **State** - Required
8. **PIN Code** - 6 digits, required
9. **Product** - Bloom or Glow
10. **Quantity** - 1-10 units
11. **Order Notes** - Optional

## 🔌 API Endpoints

### Create Order
```
POST /api/orders/create

Request:
{
  "fullName": "John Doe",
  "mobile": "9876543210",
  "email": "john@example.com",
  "address": "123 Main St",
  "landmark": "Near Park",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "product": "NAV AIR Bloom",
  "quantity": 1,
  "notes": "Leave at door"
}

Response:
{
  "success": true,
  "orderId": "ORD-1719846828354-A1B2C3D4",
  "message": "Order placed successfully!"
}
```

## 🐛 Troubleshooting

### Frontend
- Clear cache: `npm cache clean --force`
- Reinstall: `rm -rf node_modules && npm install`
- Check backend URL in `.env.local`

### Backend
- Check email configuration in `.env`
- Verify port 5000 is not in use
- Check Node.js version (v16+)

## 📞 Support

For issues:
1. Check backend logs
2. Verify email configuration
3. Check network connectivity
4. Review error messages in browser console

## 📄 License

Private project for NAV AIR

---

**Made with ❤️ by NAV AIR Team**
