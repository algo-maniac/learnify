const Instructor = require("../models/instructor");
const { VideoLecture } = require("../models/videoLecture");
const Course = require("../models/course");
const Section = require("../models/section");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Post = require("../models/post");
const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: 'desdkbhvz',
  api_key: '822224579263365',
  api_secret: 'kTX01qyk21TXjM3YPAdBd4YN6ps'
});



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


module.exports.createCourse = async (req, res) => {
  try {
    const { title, description, duration, price, level, category } = req.body;

    const thumbnail = req.file;
    const thumbnailUrl = await uploadToCloudinary(thumbnail);

    const course = new Course({
      title: title,
      description: description,
      duration: duration,
      price: price,
      level: level,
      category: category,
      thumbnail: thumbnailUrl,
    });

    course.save();

    res.status(200).json({
      message: "Created Course Successfully",
      courseId: course._id
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "There is some problem at our end"
    })
  }
}


module.exports.createSection = async (req, res) => {
  try {
    const { courseId, title, description } = req.body;

    const section = new Section({
      courseId: courseId,
      title: title,
      description: description,
    });

    section.save();

    res.status(200).json({
      message: "Section Course Successfully",
      courseId: section._id
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "There is some problem at our end"
    })
  }
}



