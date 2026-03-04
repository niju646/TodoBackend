const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

// Public Routes
router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.post("/logout", userController.logout);
router.post("/refreshToken", userController.refreshToken);

module.exports = router;
