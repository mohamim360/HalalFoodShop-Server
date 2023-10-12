// Import necessary libraries and modules

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables
const cors = require("cors");
const flash = require("connect-flash");

// Import routes for different parts of the application
const authRoutes = require("./routes/auth"); // Authentication routes
const userRoutes = require("./routes/user"); // User-related routes
const adminRoutes = require("./routes/admin"); // Admin-related routes
const shopRoutes = require("./routes/shop"); // Shop-related routes

// Create an instance of the Express application
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON data in requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(flash()); // Flash messages support

// Define route handlers for different parts of the application
app.use("/auth", authRoutes); // Routes related to authentication
app.use("/admin/user", userRoutes); // Routes for admin users
app.use("/admin/product", adminRoutes); // Routes for admin products
app.use("/shop", shopRoutes); // Routes for the shop

// Connect to the MongoDB database using the provided DB URI
mongoose
  .connect(process.env.DB_URI)
  .then((result) => {
    console.log("Connected to the database");
    app.listen(5000); // Start the Express application on port 5000
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });
