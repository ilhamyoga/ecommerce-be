const Joi = require('joi');

module.exports = {
  list: {
    query: Joi.object().keys({
      page: Joi.number().integer().min(1).default(1),
      limit: Joi.number().integer().min(1).max(100).default(10),
      name: Joi.string().max(100)
    })
  },
  detail: {
    params: Joi.object().keys({
      id: Joi.number().integer().min(1).required()
    })
  },
}
