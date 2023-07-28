const router = require('express').Router()
const cors = require('cors')
router.use(cors())

// controller
const AuthController = require('../controller/app/AuthController')
const MediaController = require('../controller/app/MediaController')

// middleware
const isAuth = require('../middlewares/isAuth')

router.get('/status', AuthController.status)

// registration
router.post('/register', AuthController.registerCompany)
router.post('/upload', MediaController.uploadMedia)
router.get('/company', AuthController.getCompany)

// auth
router.post('/login', AuthController.login)
router.post('/update-profile', isAuth, AuthController.updateProfile)

module.exports = router