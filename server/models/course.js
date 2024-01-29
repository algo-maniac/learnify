const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true},
  title: { type: String, required: true },
  description: String,
  duration: { type: Number, reqsuired: true },
  price: { type: Number, required: true },
  level: String,
  category: String,
  thumbnail: String,
  publishedDate: Date,
  enrollmentCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: [{ user: String, comment: String }],
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
}, { timestamps: true });

courseSchema.index({ createdAt: -1 });

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
