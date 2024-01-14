const mongoose = require("mongoose");
const Section = require("./section");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    level: String,
    category: String,
    thumbnail: String,
    publishedDate: Date,
    enrollmentCount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: [{ user: String, comment: String }],
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
  });

  const Course = mongoose.model("course", courseSchema);

  module.exports = Course;
  