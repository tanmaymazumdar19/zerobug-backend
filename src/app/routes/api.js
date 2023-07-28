const router = require('express').Router()
const cors = require('cors')
router.use(cors())

const AuthController = require('../controller/app/AuthController')
const MediaController = require('../controller/app/MediaController')

router.get('/status', AuthController.status)
// registration
router.post('/register', AuthController.registerCompany)
router.post('/upload', MediaController.uploadMedia)

// auth
router.post('/login', AuthController.login)

module.exports = router