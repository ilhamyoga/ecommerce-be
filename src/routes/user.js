'use strict';

const express = require('express');

// CONTROLLERS
const authController = require('../controllers/user/auth');

// AUTH ROUTES
const authRouter = express.Router()
authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);

module.exports = {
  authRouter
}
