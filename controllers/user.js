const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
  static login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const data = await User.findOne({ email })

    if (data && (await bcrypt.compare(password, data.password))) {
      const { _id, name, email } = data
      res.json({
        _id,
        name,
        email,
        token: this.token(_id),
      })
    } else {
      throw new Error('Email or Password is wrong')
    }
  })

  static register = asyncHandler(async (req, res) => {
    const body = req.body
    const salt = await bcrypt.genSalt()
    body.password = await bcrypt.hash(body.password, salt)

    const data = await User.create(body)
    data.token = this.token(data._id)
    const { _id, name, email } = data
    res.json({
      _id,
      name,
      email,
      token: this.token(_id),
    })
  })

  static token = (id) => {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: '30d' })
  }

  static getAll = asyncHandler(async (req, res) => {
    const data = await User.find()
    res.json(data)
  })
}

module.exports = UserController
