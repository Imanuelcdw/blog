const express = require('express')
const router = express.Router()

const { getAll, create, get, update, remove } = require('../controllers/post')

router.route('/').get(getAll).post(create)
router.route('/:id').get(get).put(update).delete(remove)

module.exports = router
