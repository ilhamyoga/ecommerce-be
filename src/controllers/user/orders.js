'use strict'

const response = require('../../utils/response');
const catchAsync = require('../../utils/catchAsync');
const { paginationRequest } = require('../../utils/helpers');
const { sequelize, Orders, Products, OrderProduct } = require('../../db/mysql/models');

module.exports = {
  list: catchAsync(async (req, res) => {
    const { page, limit, offset, totalPage } = paginationRequest(req.query)
    const { status } = req.query
    const user = req.user

    const orders = await Orders.findAndCountAll({
      offset,
      limit,
      where: {
        userId: user.id,
        ...(status && { status })
      }
    })

    const meta = { 
      page, 
      limit, 
      totalData: orders.count, 
      totalPage: totalPage(orders.count)
    }

    res.status(200).json(response({ data: orders.rows, meta }))
  }),

  detail: catchAsync(async (req, res) => {
    const user = req.user

    const order = await Orders.findOne({
      where: { id: req.params.id, userId: user.id },
      include: [
        {
          association: 'products',
          required: false
        }, 
        {
          association: 'payments',
          required: false
        }
      ]
    })
    if (!order) {
      return res.status(404).json(response({ error: 'Order not found' }))
    }

    res.status(200).json(response({ data: order }))
  }),

  create: catchAsync(async (req, res) => {
    const { id } = req.user
    const { products } = req.body

    await sequelize.transaction(async (t) => {
      try {
        // Check product availability
        const productIds = products.map(product => product.id)
        const productsData = await Products.findAll({
          where: { id: productIds, isActive: true }, 
          transaction: t, 
          lock: true 
        })
        if (productsData.length !== productIds.length) {
          return res.status(400).json(response({ error: 'Some products are not available' }))
        }
        
        let totalPrice = 0;
        const orderProducts = []
        for (const productData of productsData) {
          const product = products.find(product => product.id === productData.id)
          if (productData.qty < product.qty) {
            return res.status(400).json(response({ error: 'Some products are out of stock' }))
          }
          totalPrice += productData.price * product.qty
          orderProducts.push({
            productId: productData.id,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            qty: product.qty,
          })
        }

        const order = await Orders.create({
          orderCode: true, 
          userId: id,
          total: totalPrice
        }, { transaction: t })
        await order.reload({ transaction: t })

        await OrderProduct.bulkCreate(orderProducts.map(product => ({
          orderId: order.id,
          ...product
        })), { transaction: t })

        // Update product stock
        for (const orderProduct of orderProducts) {
          await Products.decrement('qty', {
            by: orderProduct.qty,
            where: { id: orderProduct.productId },
            transaction: t
          })
        }

        return res.status(200).json(response({ data: order }))
      } catch (error) {
        throw error
      }
    })
  }),
}
