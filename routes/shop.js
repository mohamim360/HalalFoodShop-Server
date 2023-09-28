const express = require("express");

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

const User = require("../models/user");

router.get("/all-products", shopController.getShopProducts);

router.post("/cart", isAuth,(req, res, next) => {
  if (!req.userId) {
    return next();
  }
  User.findById(req.userId)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
}, shopController.postCart);

module.exports = router;
