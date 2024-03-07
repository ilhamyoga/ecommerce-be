const Joi = require('joi');

module.exports = {
  register: {
    body: Joi.object().keys({
      name: Joi.string().max(100).required(),
      email: Joi.string().email().max(100).required(),
      password: Joi.string().min(6).required()
    })
  },
  login: {
    body: Joi.object().keys({
      email: Joi.string().email().max(100).required(),
      password: Joi.string().required()
    })
  }
}