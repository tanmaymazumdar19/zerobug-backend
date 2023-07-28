const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      maxlength: [50, "email can not exceed {MAXLENGTH} characters"],
    },
    industry: { type: String, required: true },
    logo: { type: String, required: false },
    location: {
        name: { type: String, required: false },
        type: { type: String, required: false, default: 'Point' },
        coordinates: [
            { type: Number, required: false }, { type: Number, required: false }
        ]
    },
    gst_no: { type: String },
    document: { type: String },
    tia_no: { type: String },
    size: { type: Number },
    available_employees: { type: Number },
    established_in: { type: Date, default: mongoose.now() },
    description: { type: String },
    ratings: { type: Number },
    is_approved: { type: Boolean, required: true, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);


CompanySchema.index({ location: "2dsphere" });
module.exports = mongoose.model("companies", CompanySchema);
