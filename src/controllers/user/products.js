'use strict'

const response = require('../../utils/response')
const catchAsync = require('../../utils/catchAsync')
const { paginationRequest } = require('../../utils/helpers')
const { Sequelize, Products } = require('../../db/mysql/models')

module.exports = {
  list: catchAsync(async (req, res) => {
    const { page, limit, offset, totalPage } = paginationRequest(req.query)
    const { name } = req.query

    const products = await Products.findAndCountAll({
      offset,
      limit,
      where: {
        name: { [Sequelize.Op.like]: `%${name || ''}%` },
        isActive: true
      },
      attributes: { exclude: ['isActive'] }
    })

    const meta = { 
      page, 
      limit, 
      totalData: products.count, 
      totalPage: totalPage(products.count)
    }

    res.status(200).json(response({ data: products.rows, meta }))
  }),

  detail: catchAsync(async (req, res) => {
    const product = await Products.findByPk(req.params.id, { 
      attributes: { exclude: ['isActive'] }
    })
    if (!product) {
      return res.status(404).json(response({ error: 'Product not found' }))
    }
    res.status(200).json(response({ data: product }))
  }),
}
