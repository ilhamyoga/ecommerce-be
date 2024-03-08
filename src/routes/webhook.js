'use strict';

const express = require('express');

// CONTROLLERS
const mitransController = require('../controllers/webhook/mitrans');

// ROUTES
const webhookRouter = express.Router()
webhookRouter.post('/payout-notification', mitransController.payoutNotification)

module.exports = {
  webhookRouter,
  webhookRouter
}
