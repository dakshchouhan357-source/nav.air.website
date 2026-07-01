import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import orderRoutes from "./routes/orders.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "✅ NAV AIR Backend is running!", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/orders", orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ 
    success: false, 
    message: "Server error", 
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 NAV AIR Backend Server Running!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📧 Business Email: ${process.env.BUSINESS_EMAIL || "Not configured"}`);
  console.log(`✅ Ready to receive orders!\n`);
});
