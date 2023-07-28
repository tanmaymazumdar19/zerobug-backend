const Company = require('../models/company')
const uuid = require('uuid')
const { sendWelcomeMail } = require('../utils/SESMail')
const { generateRandomString } = require('../utils/general')

exports.create = async (data) => {
  return Company.create(data)
}

exports.getOneCompany = async (email) => {
   return Company.findOne({ email: { $regex: `^${email}$`, $options: 'i' }, is_deleted: false })
}

exports.createCompany = async (data) => {
   const company = await this.getOneCompany(data.email)
   if(company) {
    return 1010
   }
   const password = generateRandomString(10)
   data.password = password
   await this.create(data)
   await sendWelcomeMail(data.email, `Congratulations your registration was successful, Please use this ${password}.`)
}