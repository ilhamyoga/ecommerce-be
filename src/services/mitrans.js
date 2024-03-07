'use strict'

const midtransClient = require('midtrans-client')
const config = require('../config')

// Create Core API instance
const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  clientKey: config.midtrans_client_key,
  serverKey: config.midtrans_server_key
})

const createChargeBNI = (data) => {
  const parameter = {
    payment_type: 'bank_transfer',
    transaction_details: {
      gross_amount: data.amount,
      order_id: data.orderId
    },
    bank_transfer: {
      bank: 'bni'
    }
  }

  return coreApi.charge(parameter)
}

module.exports = {
  createChargeBNI
}
