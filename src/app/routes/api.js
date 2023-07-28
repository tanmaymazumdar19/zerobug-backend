const router = require('express').Router()
const cors = require('cors')
router.use(cors())

// controller
const AuthController = require('../controller/app/AuthController')
const MediaController = require('../controller/app/MediaController')
const EmployeeController = require('../controller/app/EmployeeController')

// middleware
const isAuth = require('../middlewares/isAuth')

router.get('/status', AuthController.status)

// company registration
router.post('/register', AuthController.registerCompany)
router.post('/upload', MediaController.uploadMedia)

// company auth
router.post('/login', AuthController.login)
router.post('/update-profile', isAuth, AuthController.updateProfile)

// employee
router.post('/employee-list', isAuth, EmployeeController.getAllEmployees)
router.post('/create-employee-profile', isAuth, EmployeeController.createEmployeeProfile)

module.exports = router