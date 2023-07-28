const EmployeeService = require("../../../services/EmployeeService");
const responseHandler = require("../../../utils/responseHandler");

exports.getAllEmployees = async (request, response, next) => {
  try {
    const data = await EmployeeService.getAllEmployee(
      request.user,
      request.body
    )
    if (String(typeof data) === "number") {
      return responseHandler(request, response, next, false, data, {});
    }
    return responseHandler(request, response, next, true, 3043, data);
  } catch (err) {
    next(err);
  }
};

exports.createEmployeeProfile = async (request, response, next) => {
  try {
    const data = await EmployeeService.createEmployeeProfile(
      request.user.id,
      request.body
    );
    return responseHandler(request, response, next, true, 3044, data);
  } catch (err) {
    next(err);
  }
};
