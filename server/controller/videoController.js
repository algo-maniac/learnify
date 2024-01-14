const User = require("../models/user");
const { VideoLecture, Comment } = require("../models/videoLecture");
const Instructor = require("../models/instructor");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { Readable } = require('stream');
const cloudinary = require('cloudinary').v2;


const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });
});



cloudinary.config({
  cloud_name: 'desdkbhvz',
  api_key: '822224579263365',
  api_secret: 'kTX01qyk21TXjM3YPAdBd4YN6ps'
});

// Function to upload file to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error);
        resolve(result.secure_url);
      })
      .end(file.buffer);
  });
};

module.exports.getVideoDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await VideoLecture.findById(id).populate({
      path: 'instructorId',
      select: '_id username profileImage'
    });

    res.status(200).json({
      video: video
    })
  } catch (err) {
    console.log(err);
    res.status(200).json({
      error: "can't video the the video you requested"
    })
  }
}


module.exports.createComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;

    const comment = new Comment({
      userId: req.user.id,
      userType: req.user.role,
      text: text,
    });

    await comment.save();

    const videoLecture = await VideoLecture.findByIdAndUpdate(
      videoId,
      { $push: { comments: comment._id } },
      { new: true }
    );
    
    // console.log(videoLecture);

    res.status(200).json({
      message: "Successfully added comment"
    })
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "There is some problem at our end"
    })
  }
};


module.exports.addReply = async (req, res) => {
  try {
    const { videoId, commentId, replyText } = req.body;
    const reply = {
      userId: req.user.id,
      userType: req.user.role,
      text: replyText,
    };

    const videoLecture = await VideoLecture.findOneAndUpdate(
      { _id: videoId, 'comments._id': commentId },
      { $push: { 'comments.$.replies': reply } },
      { new: true }
    );
    // console.log(videoLecture);
    // console.log(videoLecture.comments[0].replies);
    return res.status(200).json({
      message: "Successfully added reply"
    })
  } catch(err) {
    console.log(err);
    return res.status(500).json({
      message: "There is some problem at our end"
    })
  }
};
