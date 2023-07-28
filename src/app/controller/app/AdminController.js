const AdminService = require('../../../services/admin.service');
const makeResponse = require('../../../utils/responseHandler')
const adminService = new AdminService();

class AdminController {
  async login(req, res, next) {
    try {
      let { email, password } = req.body;
      email = email?.trim();
      password = password?.trim();

      const data = await adminService.login(email, password);
      makeResponse(req, res, next, 200, 3001, data);
    } catch(err) {
      next(err)
    }
  }

  // Other controller functions related to user management
}

module.exports = AdminController;