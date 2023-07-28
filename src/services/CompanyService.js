const Company = require('../models/company');
const uuid = require('uuid')
const { sendWelcomeMail } = require('../utils/SESMail')
const { generateRandomString } = require('../utils/general')
const { encrypt } = require('../utils/argon');
const {companyStatusEnum} = require('../config/enums');
const mongoose = require('mongoose');

exports.create = async (data) => {
  return Company.create(data)
}

exports.update = async (id, data) => {
  return Company.findOneAndUpdate({_id: id}, {$set: data})
}

exports.getOneCompany = async (email) => {
   return Company.findOne({ email: { $regex: `^${email}$`, $options: 'i' }, is_deleted: false })
}

exports.createCompany = async (data) => {
   const company = await this.getOneCompany(data.email)
   if(company) {
    return 1010
   }
   data.location = {
    coordinates: [0,0]
   }
   data.password = await encrypt(data.password)
   await this.create(data)
   await sendWelcomeMail(data.email, `Congratulations your registration was successful, Please use this ${password}.`)
}

exports.getCompanies = async (status) => {
   if(!companyStatusEnum.includes(status)) {
      const error = new Error('status must be one of ' + companyStatusEnum.join(','));
      error.statusCode = 400;
      throw error;
   }
   
   return await Company.find({
      is_approved: status,
      is_deleted: false
   });
}

exports.updateCompanyStatus = async (companyId, status) => {
   return await Company.findByIdAndUpdate(companyId, {
      is_approved: status
   }, {new: true});
}

exports.getCompany = async (companyId) => {
   if(!mongoose.Types.ObjectId.isValid(companyId)) {
      const error = new Error('companyId must be a valid mongoDB id');
      error.statusCode = 400;
      throw error;
   }

   const foundCompany = await Company.findById(companyId);

   if(!foundCompany) {
      const error = new Error('company not found');
      error.statusCode = 401;
      throw error;
   }

   return foundCompany;
}

