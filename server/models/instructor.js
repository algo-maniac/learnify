const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: String,
  profileImage: { type: String },
  socialMediaLinks: {
    linkedin: String,
    twitter: String,
  },
  videoLectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VideoLecture' }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  isApproved: { type: Boolean, default: false },
}, {
  timestamps: true, 
});

const Instructor = mongoose.model("instructor", instructorSchema);

module.exports = Instructor;