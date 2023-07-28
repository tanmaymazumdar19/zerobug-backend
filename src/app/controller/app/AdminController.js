const AdminService = require('../../../services/admin.service');
const companyService = require('../../../services/CompanyService');
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

  async getCompanies(req, res, next) {
    try {
      const status = req?.query?.status?.trim();

      const unapprovedCompanies = await companyService.getCompanies(status);
      makeResponse(req, res, next, 200, 3001, {unapprovedCompanies});
    } catch(err) {
      next(err);
    }
  }

  async updateCompanyApprovalStatus(req, res, next) {
    try {
      let { companyId, status } = req.body;

      companyId = companyId?.trim();
      status = status?.trim();
      
      await adminService.updateCompanyApprovalStatus(companyId, status);
      makeResponse(req, res, next, 200, 3003, {});
    } catch(err) {
      next(err)
    }
  }
}

module.exports = AdminController;