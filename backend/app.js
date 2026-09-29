const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const allowedOrigin = process.env.FRONTEND_URL;
app.use(
  cors({
    origin: allowedOrigin || true,
    credentials: true
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "BizHub Multi-Vendor B2B Backend API is running",
    status: "ok"
  });
});

// Connect only when an API request needs the database.
// The connection is cached across warm Vercel instances.
app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/users", userRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);

// Explicit JSON error response for Vercel/Express.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Internal server error",
    ...(process.env.NODE_ENV !== "production" ? { error: err.message } : {})
  });
});

module.exports = app;
