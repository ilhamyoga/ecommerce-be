'use strict';

const express = require('express');

// MIDDLEWARES
const validate = require('../middlewares/validate');

// VALIDATIONS
const authValidation = require('../validations/user/auth');

// CONTROLLERS
const authController = require('../controllers/user/auth');

// AUTH ROUTES
const authRouter = express.Router()
authRouter.post('/login', validate(authValidation.login), authController.login);
authRouter.post('/register', validate(authValidation.register), authController.register);

module.exports = {
  authRouter
}
