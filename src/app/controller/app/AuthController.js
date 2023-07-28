const responseHandler = require("../../../utils/responseHandler")
const CompanyService = require('../../../services/CompanyService')

exports.status = async (request, response, next) => {
  try {
    return responseHandler(request, response, next, true, 3000, 'Healthy Status')
  } catch (error) {
    next(error)
  }
}

exports.registerCompany = async (request, response, next) => {
  try {
    await CompanyService.createCompany(request.body)
    return responseHandler(request, response, next, true, 3001, 'Password has been sent to your email')
  } catch (error) {
    next(error)
  }
}