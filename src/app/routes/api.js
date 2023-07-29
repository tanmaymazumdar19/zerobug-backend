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
router.get('/company', isAuth, AuthController.getCompany);
router.get('/employee', isAuth, AuthController.getEmployee);
router.post('/review-employee', isAuth, AuthController.reviewEmployee);


// File upload
router.post('/file-upload', MediaController.uploadFile)

// company auth
router.post('/login', AuthController.login)
router.post('/update-profile', isAuth, AuthController.updateProfile)

// employee
router.post('/employee-list', isAuth, EmployeeController.getAllEmployees)
router.post('/create-employee-profile', isAuth, EmployeeController.createEmployeeProfile)
router.post('/contact', isAuth, EmployeeController.contactCompany)

module.exports = router