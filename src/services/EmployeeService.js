const Employee = require('../models/employee')
const mongoose = require('mongoose')

exports.getAllEmployee = async (user, data) => {
  let queryBuilder = { is_deleted: false }
  const aggregatePipe = []
  if(data.location) {
    aggregatePipe.push({ $geoNear: {
          near: {
            type: 'Point',
            coordinates: [data.location[0], data.location[1]],
          },
          distanceField: 'distance',
          maxDistance: 100000, // In meters
          spherical: true,
        },
       })
      }
  const { resources, stacks, experience, rate_per_hour, on_bench_availability, timing, flexibility} = data.filter
  if (data.search) {
    queryBuilder.$or = [{
      name : new RegExp('.*' + data.search + '.*', 'i')},{
      company_name : new RegExp('.*' + data.search + '.*', 'i')}
    ]
  }
  if(resources === 'my-resources') {
    queryBuilder.company_id = new mongoose.Types.ObjectId(user.id)
   }
   if (stacks) {
    queryBuilder.skill_set = { $in : stacks}
   }
   if (experience) {
     queryBuilder.work_experience = {$eq: experience}
   }
   if (rate_per_hour) {
    queryBuilder.pricing = rate_per_hour
  }
  if (on_bench_availability) {
    queryBuilder.on_bench_availability = on_bench_availability
  }
  if (timing) {
    queryBuilder.timing = timing
  }
  if (flexibility) {
    queryBuilder.work_flexibility = flexibility
  }
  aggregatePipe.push({$match: {...queryBuilder}})

  return await Employee.aggregate(aggregatePipe)
}

exports.createEmployeeProfile = async (companyId, data) => {
   data.company_id = companyId
   data.pricing = data.rate || 0
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