const Employee = require('../models/employee')

exports.getAllEmployee = async (user, data) => {

}

exports.createEmployeeProfile = async (companyId, data) => {
   data.company_id= companyId
   data.skill_set = data.skill_set?.split(",")
   data.skill_set = data.skill_set.map(skill => skill.trim())
   return await Employee.create(data)
}