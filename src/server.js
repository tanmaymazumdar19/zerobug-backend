require('dotenv').config()
const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const server = http.createServer(app)

const PORT = process.env.PORT || 3000

server.listen(PORT, async () => {
  await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('Mongo connection established successfully')
  console.log(`Server started at port: ${PORT}`)
})
