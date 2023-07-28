const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      maxlength: [50, "email can not exceed {MAXLENGTH} characters"],
    },
    domain: { type: String },
    logo: { type: String, required: false },
    location: {
        name: { type: String, required: false },
        type: { type: String, required: false, default: 'Point' },
        coordinates: [
            { type: Number, required: false, default: 0 }, { type: Number, required: false, default: 0 }
        ]
    },
    gst_no: { type: String },
    document: { type: String },
    tin_no: { type: String },
    size: { type: Number },
    employee_onbench: { type: Number },
    established_in: { type: String },
    description: { type: String },
    ratings: { type: Number, default: 0 },
    password: { type: String },
    is_approved: { type: String, enum: ['pending', 'declined', 'approved'], required: true, default: 'pending' },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);


CompanySchema.index({ location: "2dsphere" })
module.exports = mongoose.model("companies", CompanySchema)
