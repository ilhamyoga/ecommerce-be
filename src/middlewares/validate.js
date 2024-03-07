'use strict'
const response = require('../utils/response');
const catchAsync = require('../utils/catchAsync');

module.exports = (validation) => catchAsync(async (req, res, next) => {
  const request = { body: req.body, query: req.query, params: req.params }

  try {
    // loop validation keys and validate each key
    for (const validationKey in validation) {
      const schema = validation[validationKey]
      const value = request[validationKey]
      if (schema !== undefined) {
        await schema.validateAsync(value)
      }
    }
  } catch (error) {
    return res.status(400).send(response({ error: error.message }))
  }
  
  next();
});
  