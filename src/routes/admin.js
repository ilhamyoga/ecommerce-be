'use strict'

const express = require('express');

// MIDDLEWARES
const validate = require('../middlewares/validate');

// VALIDATIONS
const authValidation = require('../validations/admin/auth');

// CONTROLLERS
const authController = require('../controllers/admin/auth');

// AUTH ROUTES
const authRouter = express.Router()
authRouter.post('/login', validate(authValidation.login), authController.login);

module.exports = {
  authRouter
}
