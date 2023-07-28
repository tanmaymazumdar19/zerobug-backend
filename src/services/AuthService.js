const { verify } = require('argon2')
const jwt = require('jsonwebtoken')
const CompanyService = require('./CompanyService')

exports.login = async (email, password) => {
    if(!email) {
      return 1011
    }
    if(!password) {
      return 1012
    }
    const company = await CompanyService.getOneCompany(email)

    if(!company) {
      return 1013
    }
    if(company.is_approved !== 'approved'){
        return 1015
    }
    if(!await verify(company?.password, password)) {
      return 1014
    }
    const authToken = await this.getSignedToken({id: company?.id, email: company?.email});
    return {
      authToken, company
    }
}

exports.getSignedToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_COMPANY_SECRET_KEY, { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRES_IN })
}