const router = require('express').Router()
const cors = require('cors');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware')
const AdminController = require('../controller/app/AdminController'); 

const adminController = new AdminController(); 
router.use(cors());

router.post('/login', adminController.login);

router.get('/get-companies', adminAuthMiddleware, adminController.getCompanies);
router.post('/update-company-status', adminAuthMiddleware, adminController.updateCompanyApprovalStatus);

module.exports = router