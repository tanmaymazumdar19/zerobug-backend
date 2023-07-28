const router = require('express').Router()
const cors = require('cors')

router.use(cors())
const AuthController = require('../controller/app/AuthController')

router.get('/status', AuthController.status)
module.exports = router