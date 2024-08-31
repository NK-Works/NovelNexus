const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.post("/signup", authController.signupUser);
authRouter.post("/login", authController.loginUser);
authRouter.post("/logout", authController.logoutUser);

module.exports = authRouter;
