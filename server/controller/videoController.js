const User = require("../models/user");
const { VideoLecture, Comment } = require("../models/videoLecture");
const Instructor = require("../models/instructor");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
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
  const { videoId } = req.query;

  try {
    const video = await VideoLecture.findById(videoId).populate({
      path: 'instructorId',
      select: '_id username profileImage'
    });

    // const video = await VideoLecture.findById(id)
    //   .populate({
    //     path: 'instructorId',
    //     select: '_id username profileImage',
    //   })
    //   .populate({
    //     path: 'comments.userId',
    //     select: '_id username profileImage',
    //   })
    //   .populate({
    //     path: 'comments.replies.userId',
    //     select: '_id username profileImage',
    //   });
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
    const { videoId } = req.query;
    const { text } = req.body;

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

    if (!videoLecture) {
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
    const { videoId, commentId } = req.query;
    const { text } = req.body;
    console.log(req.user);
    const reply = {
      userId: req.user.id,
      username: req.user.username,
      role: req.user.role,
      text: text,
    };

    const videoLecture = await VideoLecture.findOneAndUpdate(
      { _id: videoId, 'comments._id': commentId },
      { $push: { 'comments.$.replies': reply } },
      { new: true }
    );

    if (!videoLecture) {
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



// Add Like Endpoint
module.exports.addLike = async (req, res) => {
  try {
    const { videoId } = req.query;
    const userId = req.user.id;

    const result = await toggleLikeStatus(videoId, userId, 'add');

    if (result.success) {
      return res.status(200).json({ message: result.message, likeCount: result.likeCount });
    } else {
      return res.status(400).json({ message: result.message, likeCount: result.likeCount });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Remove Like Endpoint
module.exports.removeLike = async (req, res) => {
  try {
    const { videoId } = req.query;
    const userId = req.user.id;

    const result = await toggleLikeStatus(videoId, userId, 'remove');

    if (result.success) {
      return res.status(200).json({ message: result.message, likeCount: result.likeCount });
    } else {
      return res.status(400).json({ message: result.message, likeCount: result.likeCount });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Function to toggle like status and update local state
async function toggleLikeStatus(videoId, userId, action) {
  try {
    // Fetch video from the database
    const video = await VideoLecture.findById(videoId).exec();

    // Check if the user has already liked the video
    const userIndex = video.likes.indexOf(userId);
    const userLiked = userIndex !== -1;

    if ((action === 'add' && !userLiked) || (action === 'remove' && userLiked)) {
      let updateQuery;

      if (action === 'add') {
        updateQuery = {
          $addToSet: { likes: userId },
          $inc: { likeCount: 1 },
        };
      } else if (action === 'remove') {
        updateQuery = {
          $pull: { likes: userId },
          $inc: { likeCount: -1 },
        };
      } else {
        throw new Error(`Invalid action: ${action}`);
      }

      // Save the updated video to the database
      const video = await VideoLecture.findByIdAndUpdate(videoId, updateQuery, { new: true }).exec();
      console.log(video);
      console.log(video.likes);


      return { success: true, message: `Like ${action === 'add' ? 'added' : 'removed'} successfully.`, likeCount: video.likeCount };
    } else {
      return { success: false, message: `User already ${action === 'add' ? 'liked' : 'not liked'} the video.`, likeCount: video.likeCount };
    }
  } catch (error) {
    console.log(`Error ${action === 'add' ? 'adding' : 'removing'} like:`, error);
    return { success: false, message: 'Error occurred while toggling like status.' };
  }
}

