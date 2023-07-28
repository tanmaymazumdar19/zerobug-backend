const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
  email: { type: String, required: true, maxlength: [50, 'email can not exceed {MAXLENGTH} characters'] },
  password: { type: String, required: false },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('admins', AdminSchema)
