const responseHandler = require("../../../utils/responseHandler")
const CompanyService = require('../../../services/CompanyService');
const EmployeeService = require('../../../services/EmployeeService');
const AuthService = require('../../../services/AuthService');
const { response } = require("express");

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

    companyId = companyId?.trim();
    
    let data = await CompanyService.getCompany(companyId);
    data = data.toObject();
    /* Add company employees when schema is avaiable */
    const companyUsers = await EmployeeService.getEmployeesOfCompany(companyId);

    console.log("companyUsers", companyUsers);
    
    data["company_users"] = companyUsers;
    
    return responseHandler(request, response, next, true, 3044, data);
  } catch(err) {
    next(err)
  }
}

exports.getEmployee = async (request, response, next) => {
  try {
    let { employeeId } = request?.query;

    employeeId = employeeId?.trim();
    
    const data = await EmployeeService.getEmployee(employeeId);
    
    return responseHandler(request, response, next, true, 3046, data);
  } catch(err) {
    next(err)
  }
}

exports.reviewEmployee = async (request, response, next) => {
  try {
    let { employeeId, companyId, review } = request?.body;
    
    employeeId = employeeId?.trim();
    companyId = companyId?.trim();
    review = {
      rating: review?.rating,
      comment: review?.comment?.trim()
    }
    
    console.log("reviewOuter", review);

    await EmployeeService.reviewEmployee(employeeId, companyId, review);
    
    // employeeId = employeeId?.trim();
    // const data = await EmployeeService.getEmployee(employeeId);
    return responseHandler(request, response, next, true, 3000, {});
  } catch(err) {
    next(err)
  }
}