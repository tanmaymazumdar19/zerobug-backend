const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const constants = require('../config/constants')

const SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
}

exports.sendWelcomeMail = async (email, content) => {
    const source = process.env.SES_VERIFIED_MAIL
    const sendTo = email
  
    const params = {
      Source: source,
      Destination: {
        ToAddresses: [
          sendTo
        ]
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: content
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Welcome aboard | Tapp'
        }
      }
    }
  
    // Create the promise and SES service object
    const sendPromise = new AWS.SES(SES_CONFIG).sendEmail(params).promise()
  
    // Handle promise's fulfilled/rejected states
    sendPromise.then(function (data) {
      console.log(`Welcome mail send successfully to ${email}`)
    }).catch(function (err) {
      console.error(err, err.stack)
    })
}