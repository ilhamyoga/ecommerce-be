'use strict';

const catchAsync = require('../../utils/catchAsync');
const response = require('../../utils/response');

module.exports = {
  register: catchAsync(async (req, res) => {
    res.status(200).json(response({ message: 'Register successful' }));
  }),

  login: catchAsync(async (req, res) => {
    res.status(200).json(response({ message: 'Login successful' }));
  }),
}