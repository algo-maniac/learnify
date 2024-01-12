const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    videoLectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VideoLecture' }],
  });
  

  const Section = mongoose.model("section", sectionSchema);

  module.exports = Section;
  