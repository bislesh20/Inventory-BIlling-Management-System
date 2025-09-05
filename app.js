// ------------------ Imports ------------------
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// Load environment variables early
dotenv.config();

const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");
const { isAuthenticated } = require("./middleware/auth");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const contactRoutes = require("./routes/contacts");
const transactionRoutes = require("./routes/transactions");
const reportRoutes = require("./routes/reports");

const connectDB = require("./config/db");

// ------------------ App Setup ------------------
const app = express();

// Core Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ------------------ Routes ------------------
app.use("/auth", authRoutes);
app.use("/products", isAuthenticated, productRoutes);
app.use("/contacts", isAuthenticated, contactRoutes);
app.use("/transactions", isAuthenticated, transactionRoutes);
app.use("/reports", isAuthenticated, reportRoutes);

// Error & 404 Handlers
app.use(errorHandler);
app.use(notFoundHandler);

// ------------------ Server Startup ------------------
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = app;
