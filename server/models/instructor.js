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
  purchasedCourses: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Course'
  }],
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Course'
  }], 
  wishlistedCourses: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Course'
  }],
  subscribedInstructors: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Instructor'
  }],
  subscriberCount: { type: Number, default: 0 }, 
  subscribers: [{ type: String }],
  isApproved: { type: Boolean, default: false },
}, {
  timestamps: true, 
});

const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;