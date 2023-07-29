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

   let foundEmployee = await Employee.findById(employeeId);
   

   if(!foundEmployee) {
      const error = new Error('employee not found');
      error.statusCode = 401;
      throw error;
   }
   
   if(foundEmployee?.reviews?.length > 0) {
      foundEmployee = foundEmployee.toObject();

      /* Find average review */
      let averageRating = 0;
      foundEmployee.reviews.forEach((singleReview) => {
         averageRating += singleReview.rating;
      });
      averageRating = averageRating/foundEmployee?.reviews?.length;
      if(averageRating%1 !== 0) {
         averageRating = parseFloat(averageRating.toFixed(1));
      }

      foundEmployee["averageRating"] = averageRating;

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

exports.reviewEmployee = async (employeeId, companyId, review) => {
   console.log(review);
   if(!employeeId) {
      const error = new Error('employeeId not found');
      error.statusCode = 400;
      throw error;
   }

   if(!mongoose.Types.ObjectId.isValid(employeeId)) {
      const error = new Error('employeeId must be a valid mongoId');
      error.statusCode = 400;
      throw error;
   }

   if(!companyId) {
      const error = new Error('companyId not found');
      error.statusCode = 400;
      throw error;
   }

   if(!mongoose.Types.ObjectId.isValid(companyId)) {
      const error = new Error('companyId must be a valid mongoId');
      error.statusCode = 400;
      throw error;
   }
   
   if(!review) {
      const error = new Error('review not found');
      error.statusCode = 400;
      throw error;
   }

   if(!review.rating || !review.comment ) {
      const error = new Error('review must have rating(number) and comment(string)');
      error.statusCode = 400;
      throw error;
   }

   await Employee.findByIdAndUpdate(employeeId, {
      $push: {
         reviews: {
           from: companyId,
           rating: review.rating,
           comment: review.comment,
         },
       },
   }, {new: true});
}