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
    const company = await CompanyService.createCompany(request.body)
    if(company === 1010){
      return responseHandler(request, response, next, false, 1010, {})
    }
    return responseHandler(request, response, next, true, 3002, 'Password has been sent to your email')
  } catch (error) {
    next(error)
  }
}