const Resource = require('resources.js')

class CompanyDetailsResponse extends Resource {
  toArray () {
    return {
      id: this._id || ''
    }
  }
}

module.exports = {
    CompanyDetailsResponse
}
