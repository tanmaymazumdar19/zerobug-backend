require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const apiRoutes = require('./app/routes/api')
const adminApiRoutes = require('./app/routes/adminApi')
const cors = require('./app/middlewares/cors')
const errorHandler = require('./utils/errorHandler')
const fileUpload = require('express-fileupload');

const app = express()

app.setMaxListeners(50)
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors);
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use('/api/v1', apiRoutes)
app.use('/admin-api/v1', adminApiRoutes)

app.use(errorHandler.invalidEndPoint)
app.use(errorHandler.makeErrorResponse)

module.exports = app