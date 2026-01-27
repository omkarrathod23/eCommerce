const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

// routes
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const brandRoutes = require("./routes/brand.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const userOrderRoutes = require("./routes/user.order.routes");
const couponRoutes = require("./routes/coupon.routes");
const reviewRoutes = require("./routes/review.routes");
const adminRoutes = require("./routes/admin.routes");
const cloudinaryRoutes = require("./routes/cloudinary.routes");

// error handler
const globalErrorHandler = require("./middleware/global-error-handler");

const app = express();

/* ======================
   MIDDLEWARE
====================== */
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

/* ======================
   DATABASE CONNECTION
====================== */
connectDB();

/* ======================
   ROUTES
====================== */
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/user-order", userOrderRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/admin", adminRoutes);

/* ======================
   ROOT ROUTE
====================== */
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully");
});

/* ======================
   GLOBAL ERROR HANDLER
====================== */
app.use(globalErrorHandler);

/* ======================
   404 HANDLER
====================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Not Found",
    path: req.originalUrl,
  });
});

/* ======================
   SERVER
====================== */
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;

