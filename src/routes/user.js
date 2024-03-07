'use strict';

const express = require('express');

// CONTROLLERS
const authController = require('../controllers/user/auth');

// AUTH ROUTES
const authRouter = express.Router()
authRouter.post('/login', authController.login);

module.exports = {
  authRouter
}
