const asyncHandler = require('express-async-handler')
const Post = require('../models/Post')

class PostController {
  static getAll = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const data = await Post.find({ user: _id })
    res.json(data)
  })

  static create = asyncHandler(async (req, res) => {
    const body = req.body
    body.tags = body.tags && body.tags.split(',')
    body.user = req.user._id
    const data = await Post.create(body)
    res.json(data)
  })

  static get = asyncHandler(async (req, res) => {
    const { id } = req.params
    const data = await Post.findOne({ _id: id, user: req.user._id })
    res.json(data)
  })

  static update = asyncHandler(async (req, res) => {
    const { id } = req.params
    const body = req.body
    body.tags = body.tags && body.tags.split(',')
    const data = await Post.findOneAndUpdate({ _id: id, user: req.user._id }, body, { new: true })
    res.json(data)
  })

  static remove = asyncHandler(async (req, res) => {
    const { id } = req.params
    const data = await Post.findOneAndDelete({ _id: id, user: req.user._id }, { new: true })
    res.json(data)
  })
}

module.exports = PostController
