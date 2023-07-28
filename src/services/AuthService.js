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

exports.updateProfile = async (user, data) => {
    const updatePatch = {
        location: {
            name: data?.location?.name || "",
            type: 'Point',
            coordinates: data?.location?.coordinates || [0,0]
        },
        logo: data.logo || null,
        size: data.company_size || 0,
        employee_onbench: data.employee_onbench || 0,
        domain: data.domain || ''
    }
    return await CompanyService.update(user.id, updatePatch)
}