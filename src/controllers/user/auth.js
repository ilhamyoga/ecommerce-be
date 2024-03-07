'use strict';

const bcrypt = require('bcryptjs');
const config = require('../../config');
const catchAsync = require('../../utils/catchAsync');
const response = require('../../utils/response');
const { generateRandomString } = require('../../utils/helpers');
const { Users, Sessions } = require('../../db/mysql/models');

const accessTokenCookieOptions = {
  maxAge: parseInt(config.access_token_expiration * 1000),
  httpOnly: true,
  sameSite: 'none',
  secure: true
}

const handleSignInSession = async (user) => {
  const sessionData = {
    userId: user.id,
    token: generateRandomString(100)
  }

  const [session, created] = await Sessions.findOrCreate({
    where: { userId: sessionData.userId, isValid: true },
    defaults: sessionData
  })
  if (!created) {
    await session.update(sessionData)
  }

  return { accessToken: session.token }
}

const handleSignIn = async (user, res) => {
  // Check account status
  switch (user.status) {
    case 'suspend':
      return res.status(403).json(response({ error: 'Your account is suspended' }))
    case 'banned':
      return res.status(403).json(response({ error: 'Your account is banned' }))
    default:
      break
  }
  const tokenSession = await handleSignInSession(user)

  // Remove confidential data
  delete user.dataValues.password

  res.cookie('access_token', tokenSession.accessToken, accessTokenCookieOptions)
  res.status(200).json(response({
    data: {
      ...user.dataValues,
      ...tokenSession
    }
  }))
}

module.exports = {
  register: catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    const existingEmail = await Users.scope('all').findOne({ where: { email } })
    if (existingEmail) {
      return res.status(400).json(response({ error: 'Email already registered' }))
    }

    const user = await Users.create({ userCode: true, name, email, password });
    await user.reload();

    res.status(201).json(response({ data: user }));
  }),

  login: catchAsync(async (req, res) => {
    const { email, password } = req.body

    const user = await Users.scope(['defaultScope', 'withPassword']).findOne({ where: { email } })
    if (!user) {
      return res.status(400).json(response({ error: 'Invalid email or password' }))
    }

    // Compare returned password with user password input
    const isPasswordMatch = bcrypt.compareSync(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).json(response({ error: 'Invalid email or password' }))
    }

    handleSignIn(user, res)
  }),
}