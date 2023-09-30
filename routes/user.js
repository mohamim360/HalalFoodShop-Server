const express = require("express");

const userController = require("../controllers/user");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get("/users", isAuth, isAdmin, userController.getUsers);

router.get("/users/:userId", isAuth, isAdmin, userController.getUser);

router.patch("/users/:userId", isAuth, isAdmin, userController.updateUserRole);

router.delete("/users/:userId", isAuth, isAdmin, userController.deleteUser);

module.exports = router;
