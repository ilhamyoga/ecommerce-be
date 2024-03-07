const Joi = require('joi');
const enums = require('../../utils/enums');

module.exports = {
  list: {
    query: Joi.object().keys({
      page: Joi.number().integer().min(1).default(1),
      limit: Joi.number().integer().min(1).max(100).default(10),
      status: Joi.string().valid(...enums.ORDER_STATUS)
    })
  },
  detail: {
    params: Joi.object().keys({
      id: Joi.number().integer().min(1).required()
    })
  },
  create: {
    body: Joi.object().keys({
      products: Joi.array().items(
        Joi.object().keys({
          id: Joi.number().integer().min(1).required(),
          qty: Joi.number().integer().min(1).required()
        })
      ).required()
    })
  }
}