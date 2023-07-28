const Resource = require('resources.js')

class MediaResponse extends Resource {
  toArray () {
    return {
      key: this.key || ''
    }
  }
}

module.exports = {
    MediaResponse
}
