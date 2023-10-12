// Import necessary libraries and modules
const express = require("express");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

// Create an instance of an Express Router
const router = express.Router();

// Define routes for managing products, which require authentication and admin privileges

router.post("/add-products", isAuth, isAdmin, adminController.postAddProduct); // Add a new product

router.get("/products", isAuth, isAdmin, adminController.getProducts); // Get a list of products

router.get(
  "/products/:prodId",
  isAuth,
  isAdmin,
  adminController.getEditProduct
); // Get product details for editing

router.delete(
  "/products/:prodId",
  isAuth,
  isAdmin,
  adminController.deleteProduct
); // Delete a product

router.put(
  "/products/edit-product/:prodId",
  isAuth,
  isAdmin,
  adminController.putEditProduct
); // Update product information

// Export the router for use in other parts of the application
module.exports = router;
