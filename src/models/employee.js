const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'companies', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});


const EmployeeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    profile_image: { type: String, required: false },
    location: {
      name: { type: String, required: false },
      type: { type: String, required: false, default: "Point" },
      coordinates: [
        { type: Number, required: false, default: 0 },
        { type: Number, required: false, default: 0 },
      ],
    },
    work_location: { type: String },
    designation: { type: String },
    work_experience: { type: Number },
    resume: { type: String },
    skill_set: [{ type: String }],
    // ratings: { type: Number, default: 0 },
    reviews: [ReviewSchema],
    work_flexibility: { type: String, enum: ["hybrid", "remote", "on-site"] },
    company_name: { type: String },
    company_id: { type: mongoose.Schema.ObjectId, ref: "companies" },
    timing: { type: String, enum: ["day-shift", "night-shift"] },
    on_bench_availability: { type: String },
    pricing: { type: Number },
    status: { type: String, enum: ['available', 'engaged'], default: 'available' },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

EmployeeSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("employees", EmployeeSchema);
