const config = require('../config')
const response = require('../utils/response')

const getRequestIp = (req) => {
  const ip = req.headers['x-forwarded-for'] ?? req.socket.remoteAddress
  return typeof ip === 'string' ? ip.split(',')[0] : ''
}

module.exports = (req, res, next) => {
  const bearerHeader = req.headers.authorization

  const bearerToken = bearerHeader ? bearerHeader.split(' ')[1] : ''
  if (bearerToken !== config.bearer_token) {
    return res.status(403).json(response({ error: 'Access key denied' }))
  }

  // Valid ip
  let ipAddress = getRequestIp(req)
  if (!ipAddress) {
    return res.status(403).send(response({ error: 'Not allowed' }))
  } else {
    const localIp = ['::1', '::ffff:']
    if (localIp.some((ip) => ipAddress.startsWith(ip))) {
      ipAddress = 'localhost'
    }
  }
  req.ipAddress = ipAddress

  next()
}
