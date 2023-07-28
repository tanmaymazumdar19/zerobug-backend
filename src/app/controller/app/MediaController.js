const { MediaResponse } = require('../../../resources/MediaResponse')
const S3Util = require('../../../utils/S3Util')
const responseHandler = require('../../../utils/responseHandler')

exports.uploadMedia = async (request, response, next) => {
    try {
      await S3Util.upload(request, response, function (err) {
        if (err) {
          return responseHandler(request, response, next, true, 3042, err)
        } else {
            console.log(data)
          const data = new MediaResponse(request.file).exec()
          return responseHandler(request, response, next, true, 3039, data)
        }
      })
    } catch (error) {
        console.log(error)
      next(error)
    }
  }