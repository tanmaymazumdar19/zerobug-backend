const Company = require('../models/company')
const uuid = require('uuid')
const { sendWelcomeMail } = require('../utils/SESMail')
const { generateRandomString } = require('../utils/general')

exports.create = async (data) => {
  return Company.create(data)
}

exports.createCompany = async (data) => {
   const password = generateRandomString(10)
   data.password = password
   await this.create(data)
   await sendWelcomeMail(data.email, `Congratulations your registration was successful, Please use this ${password}.`)
}