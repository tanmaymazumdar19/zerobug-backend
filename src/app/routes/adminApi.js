const router = require('express').Router()
const cors = require('cors');
const AdminController = require('../controller/app/AdminController'); 

const adminController = new AdminController(); 
router.use(cors());

router.post('/login', adminController.login);

module.exports = router