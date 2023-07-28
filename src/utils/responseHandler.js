const Constants = require('../config/constants')

module.exports = async (request, response, next, status, messageCode, data) => {
  data = {
    status,
    code: messageCode,
    message: Constants.RESPONSE_CODE[messageCode],
    data
  }
  response.status(200).json(data)
}