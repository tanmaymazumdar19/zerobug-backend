const Company = require('../models/company')
const uuid = require('uuid')
const { sendWelcomeMail } = require('../utils/SESMail')
const { generateRandomString } = require('../utils/general')
const { encrypt } = require('../utils/argon')

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
}