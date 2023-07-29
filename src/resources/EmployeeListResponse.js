const Resource = require('resources.js')
const { status } = require('../config/constants')

class EmployeeListResponse extends Resource {
  toArray () {
    return {
      id: this._id,
      name: this.name || '',
      designation: this.designation,
      skill_set: this.skill_set,
      ratings: this.ratings,
      company_name: this.company_name,
      work_experience: this.work_experience,
      status:status[(this.status)?.toUpperCase()] || 'Available',
      pricing: this?.pricing,
      company_email: this?.company_id?.email
    }
  }
}

module.exports = {
  EmployeeListResponse
}
