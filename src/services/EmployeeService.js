const Employee = require('../models/employee');
const mongoose = require('mongoose');
exports.getAllEmployee = async (user, data) => {

}

exports.createEmployeeProfile = async (companyId, data) => {
   data.company_id= companyId
   data.skill_set = data.skill_set?.split(",")
   data.skill_set = data.skill_set.map(skill => skill.trim())
   return await Employee.create(data)
}

exports.getEmployee = async (employeeId) => {
   if(!mongoose.Types.ObjectId.isValid(employeeId)) {
      const error = new Error('employeeId must be a valid mongoDB id');
      error.statusCode = 400;
      throw error;
   }

   const foundEmployee = await Employee.findById(employeeId);

   if(!foundEmployee) {
      const error = new Error('employee not found');
      error.statusCode = 401;
      throw error;
   }

   return foundEmployee;
}

exports.getEmployeesOfCompany = async (companyId) => {
   if(!mongoose.Types.ObjectId.isValid(companyId)) {
      const error = new Error('companyId must be a valid mongoDB id');
      error.statusCode = 400;
      throw error;
   }

   const foundEmployees = await Employee.find({
      company_id: companyId
   });
   
   return foundEmployees;
}