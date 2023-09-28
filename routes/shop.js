const express = require("express");

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/isAuth");
const userData = require("../middleware/userData");

const router = express.Router();

router.get("/all-products", shopController.getShopProducts);

router.post("/cart", isAuth, userData, shopController.postCart);

router.get("/cart", isAuth, userData, shopController.getCart);

module.exports = router;
