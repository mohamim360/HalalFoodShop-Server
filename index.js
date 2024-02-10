// Import necessary libraries and modules

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables
const cors = require("cors");
const flash = require("connect-flash");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const multer = require("multer");

// Import routes for different parts of the application
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Create an instance of the Express application
const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}` );
  }
});
app.use(multer({  storage: fileStorage, }).single("image"));

// Middleware setup
app.use(bodyParser.json()); // Parse JSON data in requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(flash()); // Flash messages support

// Define route handlers for different parts of the application
app.use("/auth", authRoutes);
app.use("/admin/user", userRoutes);
app.use("/admin/product", adminRoutes);
app.use("/shop", shopRoutes);

//create payment intent
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

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
