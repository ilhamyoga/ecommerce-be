'use strict'

const express = require('express');

// MIDDLEWARES
const validate = require('../middlewares/validate');
const session = require('../middlewares/session');

// VALIDATIONS
const authValidation = require('../validations/admin/auth');
const productsValidation = require('../validations/admin/products');

// CONTROLLERS
const authController = require('../controllers/admin/auth');
const productsController = require('../controllers/admin/products');

// AUTH ROUTES
const authRouter = express.Router()
authRouter.post('/login', validate(authValidation.login), authController.login);

const admin = session(['super-admin', 'admin']);

// PRODUCTS ROUTES
const productsRouter = express.Router()
productsRouter.use(admin);
productsRouter.get('/', validate(productsValidation.list), productsController.list);
productsRouter.get('/:id', validate(productsValidation.detail), productsController.detail);
productsRouter.post('/', validate(productsValidation.create), productsController.create);
productsRouter.patch('/:id', validate(productsValidation.update), productsController.update);
productsRouter.delete('/:id', validate(productsValidation.delete), productsController.delete);

module.exports = {
  authRouter,
  productsRouter
}
