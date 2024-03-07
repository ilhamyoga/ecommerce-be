const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const config  = require('../config');

module.exports = {
  hash: (string, salt = '') => {
    const hashSalt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(string + salt, hashSalt)
    return hash
  },

  hashPassword: (password) => {
    return hash(password, config.salt_pass)
  },

  generateRandomString: (size, mode = '111') => {
    // '100': [0-9]
    // '010': [A-B]
    // '101': [0-9] + [a-b]
    // '111': [0-9] + [A-B] + [a-b]
    const r = (n) => Math.floor(Math.random() * n)
    const m = [...mode]
      .map((v, i) => parseInt(v, 10) * (i + 1))
      .filter(Boolean)
      .map((v) => v - 1)
    return [...new Array(size)].reduce(
      (a) =>
        a +
        String.fromCharCode(
          [48 + r(10), 65 + r(26), 97 + r(26)][m[r(m.length)]]
        ),
      ''
    )
  },

  generateRandomNumber: (min, max, decimal) => {
    const number = Math.random() * (max - min) + min
    if (decimal !== undefined) return parseFloat(number.toFixed(decimal))
    else return parseFloat(number)
  },

  generateUid: (prefix = '', size = 12) => {
    const time = Math.floor(Date.now() / 1000)
    const random = generateRandomString(size - 10, '010')
    return `${prefix}${time}${random}`
  },

  paginationRequest: (req, options = {}) => {
    const page = parseInt(req.query.page) || options.page || 1
    let limit = parseInt(req.query.limit) || options.limit || 10
    const maxLimit = options.maxLimit || 100
    if (limit > maxLimit) limit = maxLimit
    const offset = (page - 1) * limit

    const totalPage = (totalData) => Math.ceil(totalData / limit)

    return { page, limit, offset, totalPage }
  },

  searchOp: (search, keys = []) => {
    const object = keys.map(key => {
      return { [key]: { [Op.substring]: search } }
    })
    return search ? { [Op.or]: object } : null
  },

  rangeOp: (min, max, key) => {
    return {
      [Op.and]: [
        min && { [key]: { [Op.gte]: min } },
        max && { [key]: { [Op.lte]: max } }
      ]
    }
  },

  logError: (name, error) => {
    console.error(`[${new Date().toISOString()}|${name}] ${error}`)
  },

  parser: (message) => {
    try {
      return JSON.parse(message)
    } catch (error) {
      return null
    }
  },
}
