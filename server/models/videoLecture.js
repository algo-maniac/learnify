const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'userType',
  },
  username: { type: String, required: true},
  role: {
    type: String,
    required: true,
    enum: ['instructor', 'user', 'admin'],
  },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  replies: [
    {
      text: { type: String, required: true },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'userType',
      },
      username: { type: String, required: true},
      role: {
        type: String,
        required: true,
        enum: ['instructor', 'user', 'admin'],
      },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});


const videoLectureSchema = new mongoose.Schema({
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  videoFile: { type: String, required: true },
  thumbnail: { type: String, required: true },
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  
  likeCount: { type: Number, default: 0 }, // Number of likes
  likes: [{ type: String, index: true }], // Array of user IDs who liked the video
  
  comments: [commentSchema], // Array of comments using the defined comment schema
}, { timestamps: true });

videoLectureSchema.index({ createdAt: -1 });

const VideoLecture = mongoose.model('VideoLecture', videoLectureSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { VideoLecture, Comment};
