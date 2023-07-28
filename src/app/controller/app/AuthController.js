const responseHandler = require("../../../utils/responseHandler")
const CompanyService = require('../../../services/CompanyService')
const AuthService = require('../../../services/AuthService')

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
    return responseHandler(request, response, next, true, 3002, 'Registration successfull')
  } catch (error) {
    next(error)
  }
}

exports.login = async (request, response, next) => {
  try {
    let { email, password } = request.body
    email = email?.trim()
    password = password?.trim()

    const data = await AuthService.login(email, password)
    if(String(typeof data) === 'number') {
      return responseHandler(request, response, next, false, data, {})
    }
    return responseHandler(request, response, next, true, 3001, data)
  } catch(err) {
    next(err)
  }
}

exports.updateProfile = async (request, response, next) => {
  try {
    const data = await AuthService.updateProfile(request.user, request.body)
    if(String(typeof data) === 'number') {
      return responseHandler(request, response, next, false, data, {})
    }
    return responseHandler(request, response, next, true, 3043, data)
  } catch(err) {
    next(err)
  }
}

exports.getCompany = async (request, response, next) => {
  try {
    let { companyId } = request?.query;

    companyId = companyId.trim();
    
    const data = await CompanyService.getCompany(companyId);

    /* Add company employees when schema is avaiable */
    
    return responseHandler(request, response, next, true, 3044, data);
  } catch(err) {
    next(err)
  }
}