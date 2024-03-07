const response = require('../utils/response.js')
const { logError } = require('../utils/helpers.js')

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const { method, originalUrl: url } = req
  const { message, stack } = err

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json(response({ error: 'The request is not in a valid JSON format' }))
  } else {
    logError(null, `${statusCode} - ${message} - ${url} - ${method} - Stack: ${stack}`)
  }

  res.status(statusCode).json(response({ error: 'Service unavailable' }))
}
