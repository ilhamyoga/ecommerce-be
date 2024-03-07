const Joi = require('joi');

module.exports = {
  list: {
    query: Joi.object().keys({
      page: Joi.number().integer().min(1).default(1),
      limit: Joi.number().integer().min(1).max(100).default(10),
      name: Joi.string().max(100),
      isActive: Joi.boolean()
    })
  },
  detail: {
    params: Joi.object().keys({
      id: Joi.number().integer().min(1).required()
    })
  },
  create: {
    body: Joi.object().keys({
      name: Joi.string().max(100).required(),
      description: Joi.string().max(255).allow(null),
      price: Joi.number().precision(2).required(),
      qty: Joi.number().integer().min(0).required(),
      isActive: Joi.boolean().default(true)
    })
  },
  update: {
    params: Joi.object().keys({
      id: Joi.number().integer().min(1).required()
    }),
    body: Joi.object().keys({
      name: Joi.string().max(100),
      description: Joi.string().max(255),
      price: Joi.number().precision(2),
      qty: Joi.number().integer().min(0),
      isActive: Joi.boolean()
    })
  },
  delete: {
    params: Joi.object().keys({
      id: Joi.number().integer().min(1).required()
    })
  }
}
