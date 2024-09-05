// routes/userRoutes.js
const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const isLoggedIn = require('../authentication/authentication');

userRouter.get('/', isLoggedIn, userController.getAllUsers);
userRouter.get('/name/:name', isLoggedIn, userController.getUserByName);
userRouter.get('/:userId', userController.getUserById);

module.exports = userRouter;
