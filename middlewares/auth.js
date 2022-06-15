const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/User')

const protect = asyncHandler(async (req, res, next) => {
  const oauth = req.headers.authorization
  if (oauth && oauth.startsWith('Bearer')) {
    try {
      const token = oauth.split(' ')[1]
      const payload = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findOne({ _id: payload._id }).select('-password')
      next()
    } catch (error) {
      throw new Error('Token not valid')
    }
  } else {
    throw new Error('Not authorized')
  }
})

module.exports = { protect }
