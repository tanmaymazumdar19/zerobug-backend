const { MediaResponse } = require('../../../resources/MediaResponse')
const S3Util = require('../../../utils/s3bucket.utils');
const responseHandler = require('../../../utils/responseHandler')
const uuid = require('uuid')

const s3 = new S3Util();

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

exports.uploadFile = async (request, response, next) => {
  try {
    if(!request?.files?.file) {
      const error = new Error('No file to upload');
      error.statusCode = 400;
      throw error;
    }

    const fileExtension = getExtension(request?.files?.file?.name);
    const fileUrl = await s3.upload(request?.files?.file, `media-upload/${uuid.v4()}.${fileExtension}`);
    return responseHandler(request, response, next, true, 3045, {fileUrl});
  } catch(err) {
    next(err)
  }
}

const getExtension = filename => {
  const extension = filename.split('.')[1]
  return extension
}