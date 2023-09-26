const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.post("/add-products", isAuth, isAdmin, adminController.postAddProduct);

router.get("/products", isAuth, isAdmin, adminController.getProducts);

router.get("/products/:prodId", isAuth, isAdmin, adminController.getEditProduct);

module.exports = router;
