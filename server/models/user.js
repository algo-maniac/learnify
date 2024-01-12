const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },  
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
}, { 
  timestamps: true 
});

const User = mongoose.model("user", userSchema);

module.exports = User;
