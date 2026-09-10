<<<<<<< HEAD
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
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> 7a3336e (feat: add .gitignore entry and new EmailJS template file)
