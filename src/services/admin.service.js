const Admin = require('../models/admin');
const mongoose = require('mongoose');
const { verify } = require('../utils/argon');
const JWT = require('../utils/jwt');
const {companyStatusEnum, updateCompanyStatusEnum} = require('../config/enums'); 
const companyService = require('./CompanyService')

const jwt = new JWT();

class AdminService {
  async login(email, password) {
    if(!email) {
      const error = new Error('email must be provided');
      error.statusCode = 400;
      throw error;
    }

    if(!password) {
      const error = new Error('password must be provided');
      error.statusCode = 400;
      throw error;
    }

    const admin = await Admin.findOne({
      email
    });

    if(!admin) {
      const error = new Error('incorrect email');
      error.statusCode = 401;
      throw error;
    }
    
    if(!await verify(admin?.password, password)) {
      const error = new Error('incorrect password');
      error.statusCode = 401;
      throw error;
    }

    const authToken = await jwt.generateAuthToken({email: admin?.email});

    return {
      authToken
    };
  }

  async getAdminByEmail(email) {
    const admin = await Admin.findOne({
      email
    });

    if(!admin) {
      const error = new Error('Could not find the admin');
      error.statusCode = 403;
      throw error;
    }

    return admin;
  }

  async updateCompanyApprovalStatus(companyId, status) {
    if(!companyId) {
      const error = new Error('companyId must be provided');
      error.statusCode = 400;
      throw error;
    }

    if(!mongoose.Types.ObjectId.isValid(companyId)) {
      const error = new Error('companyId must be a valid mongoDb Id');
      error.statusCode = 400;
      throw error;
    }

    if(!status) {
      const error = new Error('status must be provided');
      error.statusCode = 400;
      throw error;
    }

    if(!updateCompanyStatusEnum.includes(status)) {
      const error = new Error('status must be one of ' + updateCompanyStatusEnum.join(','));
      error.statusCode = 400;
      throw error;
    }

    const updatedCompany = await companyService.updateCompanyStatus(companyId, status);

    if(!updatedCompany) {
      const error = new Error('Company not found');
      error.statusCode = 401;
      throw error;
    }
  }
}

module.exports = AdminService;