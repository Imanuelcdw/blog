const express = require('express')
const router = express.Router()

const { register, login, getAll } = require('../controllers/user')

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/get').get(getAll)

module.exports = router
