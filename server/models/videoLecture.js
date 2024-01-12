const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  replies: [this], // Array to store nested replies, referring to the same schema
});


const videoLectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  videoFile: { type: String, required: true },
  thumbnail: { type: String, required: true },
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  
  like: { type: Number, default: 0 }, // Number of likes
  
  comments: [commentSchema], // Array of comments using the defined comment schema
});


const VideoLecture = mongoose.model('VideoLecture', videoLectureSchema);

module.exports = VideoLecture;
