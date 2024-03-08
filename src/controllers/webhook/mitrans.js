'use strict'

const catchAsync = require('../../utils/catchAsync')
const response = require('../../utils/response')
const { Orders } = require('../../db/mysql/models')

module.exports = {
  payoutNotification: catchAsync(async (req, res) => {
    const { reference_no, status } = req.body

    if (status === 'completed') {
      const order = await Orders.findOne({ where: { orderCode: reference_no } })
      if (!order) {
        return res.status(404).json(response({ error: 'Order not found' }))
      }
      await order.update({ status: 'processing' })
    }
    
    res.status(200).json(response({ message: 'Ok' }))
  })
}