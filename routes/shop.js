const express = require("express");

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/all-products", shopController.getShopProducts);

module.exports = router;
