'use strict';

const catchAsync = require('../../utils/catchAsync');
const response = require('../../utils/response');
const { Users } = require('../../db/mysql/models');

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
    res.status(200).json(response({ message: 'Login successful' }));
  }),
}