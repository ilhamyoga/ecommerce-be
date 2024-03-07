const Joi = require('joi');

module.exports = {
  login: {
    body: Joi.object().keys({
      email: Joi.string().email().max(100).required(),
      password: Joi.string().required()
    })
  }
}