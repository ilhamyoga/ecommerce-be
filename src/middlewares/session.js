'use strict'

const response = require('../utils/response')
const catchAsync = require('../utils/catchAsync')
const { Sessions, Users } = require('../db/mysql/models')

const validateUserStatus = (status) => {
  switch (status) {
    case 'active':
      return { isValid: true, message: null }
    case 'suspend':
      return { isValid: false, message: 'Your account has been suspended' }
    case 'banned':
      return { isValid: false, message: 'Your account has been banned' }
    default:
      return { isValid: false, message: 'Your account has been deactivated' }
  }
}

module.exports = (roles = []) => catchAsync(async (req, res, next) => {
  const accessToken = req.cookies?.access_token || req.headers['x-access-token']

  if (!accessToken) {
    return res.status(401).send(response({ code: 1401, error: 'Invalid access token' }))
  }

  const userSession = await Sessions.findOne({ where: { token: accessToken, isValid: true } })
  if (!userSession) {
    return res.status(401).send(response({ code: 1402, error: 'Your session has expired' }))
  }

  const userData = await Users.findOne({ where: { id: userSession.userId } })
  if (!userData) {
    return res.status(403).send(response({ code: 1403, error: 'Your account has been deactivated' }))
  }

  const userStatus = validateUserStatus(userData.status)
  if (!userStatus.isValid) {
    return res.status(403).send(response({ code: 1403, error: userStatus.message }))
  }

  if (roles.length > 0) {
    // Verify access via database to prevent user role change or session hijacking
    const admin = await userData.getAdministrator()
    const hasAccess = admin ? roles.includes(admin.role) : false
    if (!hasAccess) {
      return res.status(403).send(response({ code: 1403, error: 'Access denied' }))
    }
  }

  req.user = userData
  req.session = userSession
  next()
})
