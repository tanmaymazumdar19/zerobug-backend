const router = require('express').Router()
const cors = require('cors')
router.use(cors())

const AuthController = require('../controller/app/AuthController')
const MediaController = require('../controller/app/MediaController')

router.get('/status', AuthController.status)
router.post('/register', AuthController.registerCompany)
router.post('/upload', MediaController.uploadMedia)

module.exports = router