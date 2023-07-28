const jwt = require('jsonwebtoken')
const Company = require('../../models/company')

module.exports = async (request, response, next) => {
  try {
    const token = request.get('AuthorizationToken')
    const decodedToken = jwt.verify(token, process.env.JWT_COMPANY_SECRET_KEY, {
      algorithm: 'HS256'
    })
    const company = await Company.findOne({ _id: decodedToken.id, is_deleted: false })
    if (!company) {
      throw new Error('Company not found')
    }
    request.user = {
      id: decodedToken.id,
      email: decodedToken.email,
    }
    next()
  } catch (error) {
    error.statusCode = 401
    next(error)
  }
}
