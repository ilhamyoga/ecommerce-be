'use strict';

const express = require('express');

// MIDDLEWARES
const validate = require('../middlewares/validate');

// VALIDATIONS
const authValidation = require('../validations/user/auth');
const productsValidation = require('../validations/user/products');

// CONTROLLERS
const authController = require('../controllers/user/auth');
const productsController = require('../controllers/user/products');

// AUTH ROUTES
const authRouter = express.Router()
authRouter.post('/login', validate(authValidation.login), authController.login);
authRouter.post('/register', validate(authValidation.register), authController.register);

// PRODUCTS ROUTES
const productsRouter = express.Router()
productsRouter.get('/', validate(productsValidation.list), productsController.list);
productsRouter.get('/:id', validate(productsValidation.detail), productsController.detail);

module.exports = {
  authRouter,
  productsRouter
}
