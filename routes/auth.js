const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

//auth

router.post("/signup", authController.postSignUp);

router.post("/login", authController.postLogin);

module.exports = router;
