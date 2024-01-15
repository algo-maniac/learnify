const http = require("http");
const express = require("express");
const Instructor = require("../models/instructor");
const { VideoLecture } = require("../models/videoLecture");
const Course = require("../models/course");
const Section = require("../models/section");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Post = require("../models/post");
const mongoose = require("mongoose");
const ffmpeg = require('fluent-ffmpeg');
const streamifier = require('streamifier');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const { getVideoDurationInSeconds } = require('get-video-duration');
const cloudinary = require('cloudinary').v2;

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'doubts',
  });
});


cloudinary.config({
  cloud_name: 'desdkbhvz',
  api_key: '822224579263365',
  api_secret: 'kTX01qyk21TXjM3YPAdBd4YN6ps'
});

module.exports.signuppost = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const profileImage = req.file;

    const profileImageUrl = await uploadToCloudinary(profileImage);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingInstructor = await Instructor.findOne({ email });
    if (existingInstructor) {
      return res.status(400).json({
        message: "Instructor with this eamil alread exists!"
      })
    }

    const instructor = new Instructor({
      username: username,
      email: email,
      password: hashedPassword,
      profileImage: profileImageUrl,
    });

    await instructor.save();

    return res.status(200).json({
      message: "Sucessfully registered. Awaiting approval",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "There is some problem at our end. Please retry",
    });
  }
}


module.exports.loginpost = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const instructor = await Instructor.findOne({ email: email });
    console.log("hello from login" + instructor);

    
    if (!instructor) {
      return res.status(404).json({
        message: "Instructor Not Present"
      });
    }
    
    const validPassword = await bcrypt.compare(password, instructor.password);
    if (!validPassword) {
      return res.status(404).json({
        message: "Invalid Password"
      });
    }

    if (!instructor.isApproved) {
      return res.status(401).json({
        message: "Approval pending!"
      });
    }

    const token = jwt.sign(
      {
        id: instructor.id,
        username: instructor.username,
        role: "instructor"
      },
      process.env.INSTRUCTOR_JWT_SECRET,
      { expiresIn: '24h' }
    );


    return res.status(200).json({
      message: "Login successfull",
      token: token
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "There is some problem at our end. Please retry",
    });
  }
};


module.exports.getInstructorData = async (req, res) => {
  try {
    const id = req.user.id;
    const instructor = await Instructor.findById(id);

    return res.status(200).json({
      id: instructor.id,
      username: instructor.username,
      email: instructor.email,
      role: "instructor",
      profileImage: instructor.profileImage
    });

  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Authorization failed"
    })
  }
}


module.exports.uploadVideo = async (req, res) => {
  try {
    const videoFile = req.files['video'][0];
    const thumbnail = req.files['thumbnail'][0];

    const videoFileUrl = await uploadToCloudinary(videoFile);
    const videoStream = streamifier.createReadStream(videoFile.buffer);
    const duration = await getVideoDurationInSeconds(videoStream);

    const thumbnailUrl = await uploadToCloudinary(thumbnail);

    const videoLecture = new VideoLecture({
      instructorId: req.user.id,
      courseId: req?.courseId || null,
      sectionId: req?.sectionId || null,
      title: req.body.title,
      description: req.body.description,
      duration: duration,
      videoFile: videoFileUrl,
      thumbnail: thumbnailUrl
    });

    const result = await videoLecture.save();
    const doc = await Instructor.findByIdAndUpdate(
      req.user.id,
      { $push: { videoLectures: result._id } },
      { new: true } // Return the updated document
    );

    if (!doc) {
      return res.status(404).json({
        error: "Instructor not found"
      });
    }

    res.status(200).json({
      message: "Lecture added successfully"
    })
  } catch (error) {
    console.log('Error uploading video:' + error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


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



// module.exports.createSection = async (req, res) => {
//   try {
//     const { courseId, title, description } = req.body;


//   }
// }

// app.post('/api/create-course', upload.array('videoFile'), async (req, res) => {
//   try {
//     const { title, description, duration, price, level, category, thumbnail, publishedDate, sections } = req.body;

//     // Process file uploads to Cloudinary and create VideoLecture objects
//     const processedLectures = await Promise.all(
//       req.files.map(async (file) => {
//         const uploadedVideo = await cloudinary.uploader.upload_stream(
//           { resource_type: 'video', folder: 'your-folder-name' },
//           (error, result) => {
//             if (error) throw error;
//             return result.secure_url;
//           }
//         );

//         const newVideoLecture = new VideoLecture({
//           title,
//           description,
//           duration,
//           videoFile: uploadedVideo,
//           thumbnail,
//           resources: [], // Assuming you don't handle resources in this example
//           like: 0,
//           comments: [],
//         });

//         // Save the new VideoLecture to the database
//         await newVideoLecture.save();

//         return newVideoLecture._id; // Return the ObjectId of the new VideoLecture
//       })
//     );

//     // Create a new section with the processed VideoLecture objects
//     const newSection = new Section({
//       title,
//       description,
//       videoLectures: processedLectures,
//     });

//     // Save the new section to the database
//     await newSection.save();

//     // Create a new course with the processed data
//     const newCourse = new Course({
//       title,
//       description,
//       duration,
//       price,
//       level,
//       category,
//       thumbnail,
//       publishedDate,
//       sections: [newSection._id], // Reference the new section
//     });
// 
//     // Save the new course to the database
//     await newCourse.save();

//     res.status(201).json({ message: 'Course created successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


module.exports.getAllInstructors = async (req, res) => {
  const instructors = await Instructor.find(
    { isApproved: true },
    'id username profileImage socialMediaLinks'
  );
  res.json({
    instructors: instructors
  })
}

module.exports.getInstructorWithId = async (req, res) => {
  const { id } = req.params;
  try {
    const instructor = await Instructor.findOne({
      _id: id,
      isApproved: true
    },
      "_id username profileImage videoLectures courses"
    ).populate({
      path: 'videoLectures',
      select: '_id title description duration thumbnail',
    })
    // .populate({
    //   path: 'courses',
    //   select: '_id title description duration thumbnail price rating enrollmentCount category level',
    //   options: { lean: true }
    // });


    console.log(instructor);
    res.json({
      instructor: instructor
    })
  } catch (err) {
    console.log(err);
  }
}