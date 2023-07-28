const constants = require('../config/constants.js')

exports.invalidEndPoint = () => {
  const error = new Error('Invalid Endpoint!')
  error.statusCode = 404
  throw error
}


exports.makeErrorResponse = (error, request, response, next) => {
  const status = error.statusCode || 500
  const message = error.message || 'Server Error'
  return response.status(status).json({ status: false, code: status, message, data: {} })
}