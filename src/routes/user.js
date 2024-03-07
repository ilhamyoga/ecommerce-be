'use strict';

const express = require('express');

// MIDDLEWARES
const validate = require('../middlewares/validate');
const session = require('../middlewares/session');

// VALIDATIONS
const authValidation = require('../validations/user/auth');
const productsValidation = require('../validations/user/products');
const ordersValidation = require('../validations/user/orders');

// CONTROLLERS
const authController = require('../controllers/user/auth');
const productsController = require('../controllers/user/products');
const ordersController = require('../controllers/user/orders');

// AUTH ROUTES
const authRouter = express.Router()
authRouter.post('/login', validate(authValidation.login), authController.login);
authRouter.post('/register', validate(authValidation.register), authController.register);

// PRODUCTS ROUTES
const productsRouter = express.Router()
productsRouter.use(session());
productsRouter.get('/', validate(productsValidation.list), productsController.list);
productsRouter.get('/:id', validate(productsValidation.detail), productsController.detail);

// ORDERS ROUTES
const ordersRouter = express.Router()
ordersRouter.use(session());
ordersRouter.get('/', validate(ordersValidation.list), ordersController.list);
ordersRouter.get('/:id', validate(ordersValidation.detail), ordersController.detail);
ordersRouter.post('/', validate(ordersValidation.create), ordersController.create);

module.exports = {
  authRouter,
  productsRouter,
  ordersRouter
}
