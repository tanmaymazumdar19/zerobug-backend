const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const uuid = require('uuid')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.AWS_S3_BUCKET,
  region: process.env.AWS_REGION
})

const fileFilter = (_request, file, callback) => {
    let allowedMimes = ['image/jpeg', 'image/png', 'image/svg', 'image/gif', 'video/mp4', 'video/x-msvideo', 'video/quicktime'];
    if (allowedMimes.indexOf(file.mimetype) !== -1)
        callback(null, true);
    else
        callback(null, false);
}

exports.upload = multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_S3_BUCKET,
    //   metadata: function (req, file, cb) {
    //     cb(null, { fieldName: 'Meta_Data' })
    //   },
      key: function (req, file, cb) {
        cb(null, `media-upload/${uuid.v4()}.${getExtension(file.originalname)}`)
      },
      limits: {
        fileSize: 1024 * 1024 * 5 //  allowed only 5 MB files
      }
    })
}).single('file') 

const getExtension = filename => {
    const extension = filename.split('.')[1]
    return extension
}