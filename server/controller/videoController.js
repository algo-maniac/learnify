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
    // const video = await VideoLecture.findById(id).populate({
    //   path: 'instructorId',
    //   select: '_id username profileImage'
    // });

    const video = await VideoLecture.findById(id)
      .populate({
        path: 'instructorId',
        select: '_id username profileImage',
      })
      .populate({
        path: 'comments.userId',
        select: '_id username profileImage',
      })
      .populate({
        path: 'comments.replies.userId',
        select: '_id username profileImage',
      });
    console.log(video)


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
      username: req.user.username,
      role: req.user.role,
      text: text,
    });

    const videoLecture = await VideoLecture.findByIdAndUpdate(
      videoId,
      { $push: { comments: comment } },
      { new: true }
    );
    
    if(!videoLecture) {
      return res.status(400).json({
        message: "Wrong Info"
      })
    }

    res.status(200).json({
      message: "Successfully added comment",
      comment: comment
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
    console.log(req.user);
    const reply = {
      userId: req.user.id,
      username: req.user.username,
      role: req.user.role,
      text: replyText,
    };

    const videoLecture = await VideoLecture.findOneAndUpdate(
      { _id: videoId, 'comments._id': commentId },
      { $push: { 'comments.$.replies': reply } },
      { new: true }
    );

    if(!videoLecture) {
      return res.status(400).json({
        message: "Wrong Info"
      })
    }
    // console.log(videoLecture.comments[0].replies);
    const updatedComment = videoLecture.comments.find(comment => comment._id.toString() === commentId);
    console.log(videoLecture);
    console.log(updatedComment);

    return res.status(200).json({
      message: "Successfully added reply",
      comment: updatedComment
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "There is some problem at our end"
    })
  }
};
