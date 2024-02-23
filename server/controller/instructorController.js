const http = require("http");
const express = require("express");
const User = require("../models/user");
const Instructor = require("../models/instructor");
const Admin = require("../models/admin");
const { VideoLecture } = require("../models/videoLecture");
const Course = require("../models/course");
const Section = require("../models/section");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const streamifier = require("streamifier");
const { getVideoDurationInSeconds } = require("get-video-duration");
const cloudinary = require("cloudinary").v2;

const conn = mongoose.connection;
let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "doubts",
  });
});

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
module.exports.uploadVideo = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    const videoFile = req.files["video"][0];
    const thumbnail = req.files["thumbnail"][0];

    const videoFileUrl = await uploadToCloudinary(videoFile);
    const videoStream = streamifier.createReadStream(videoFile.buffer);
    const duration = await getVideoDurationInSeconds(videoStream);

    const thumbnailUrl = await uploadToCloudinary(thumbnail);

    const videoLecture = new VideoLecture({
      instructorId: req.user.id,
      courseId: req.body?.courseId || null,
      sectionId: req.body?.sectionId || null,
      title: req.body.title,
      description: req.body.description,
      duration: duration,
      videoFile: videoFileUrl,
      thumbnail: thumbnailUrl,
    });

    const result = await videoLecture.save();
    console.log(result);

    if (req.body.courseId && req.body.sectionId) {
      const updatedSection = await Section.findByIdAndUpdate(
        req.body.sectionId,
        { $push: { videoLectures: result._id } },
        { new: true }
      );

      console.log(updatedSection);
    }

    res.status(200).json({
      message: "Lecture added successfully",
      video: result,
    });
    return;
  } catch (error) {
    console.log("Error uploading video:" + error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
        message: "Instructor with this eamil alread exists!",
      });
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
};

module.exports.loginpost = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(req.body);
    const instructor = await Instructor.findOne({ email: email });
    console.log("hello from login" + instructor);

    if (!instructor) {
      return res.status(404).json({
        message: "Instructor Not Present",
      });
    }

    const validPassword = await bcrypt.compare(password, instructor.password);
    if (!validPassword) {
      return res.status(404).json({
        message: "Invalid Password",
      });
    }

    if (!instructor.isApproved) {
      return res.status(401).json({
        message: "Approval pending!",
      });
    }

    const token = jwt.sign(
      {
        id: instructor.id,
        username: instructor.username,
        role: "instructor",
      },
      process.env.INSTRUCTOR_JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successfull",
      token: token,
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
      profileImage: instructor.profileImage,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Authorization failed",
    });
  }
};

module.exports.getInstructorCourses = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    let pageSize = 6;
    const nof_courses = await Instructor.findById(id);
    const length = nof_courses.courses.length;
    let { offset } = req.body;
    if (offset * pageSize > length) {
      pageSize = length - (offset - 1) * pageSize;
    }
    offset -= 1;
    console.log(offset);
    const coursesQuery = await Instructor.findById(id)
      .populate({
        path: "courses",
        select:
          "instructorId title description duration price level category thumbnail publishDate enrollmentCount ratingc reatedAt updatedAt",
        options: {
          sort: { createdAt: -1 },
          skip: offset * pageSize,
          limit: pageSize,
        },
      })
      .select("courses");
    const courses = coursesQuery.courses;
    console.log(courses);

    return res.status(200).json({
      ok: true,
      courses: courses,
      length_of_courses: length,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Authorization failed",
    });
  }
};

module.exports.getInstructorVideos = async (req, res) => {
  try {
    const { id } = req.params;
    const pageSize = 6;
    const { offset } = req.body;

    const instructor = await Instructor.findById(id).populate({
      path: "videoLectures",
      select: "-comments -videoFile",
      match: { courseId: null },
      options: {
        sort: { createdAt: -1 },
        skip: offset * pageSize,
        limit: pageSize,
      },
    });

    const videos = instructor.videoLectures;
    const totalVideos = videos.filter(
      (video) => video.courseId === null
    ).length;

    console.log("Videos:", videos);

    return res.status(200).json({
      ok: true,
      videos: videos,
      instructorDetails: {
        _id: id,
        username: instructor.username,
        profileImage: instructor.profileImage,
      },
      totalVideos: totalVideos,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Authorization failed",
    });
  }
};

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          reject(error);
        } else {
          console.log(result);
          if (result && result.secure_url) {
            resolve(result.secure_url);
          } else {
            reject(
              new Error("Cloudinary upload result is missing 'secure_url'.")
            );
          }
        }
      }
    );

    uploadStream.end(file.buffer);
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
    "id username profileImage socialMediaLinks"
  );
  res.json({
    instructors: instructors,
  });
};

const checkSubscription = async (userId, instructorId, role) => {
  try {
    let model;

    // Determine the model based on the role
    switch (role) {
      case 'user':
        model = User;
        break;
      case 'admin':
        model = Admin;
        break;
      case 'instructor':
        model = Instructor;
        break;
      default:
        console.log('Invalid role');
        return false;
    }

    // Find the user/admin/instructor and check the subscription
    const userRole = await model.findById(userId);

    if (userRole && userRole.subscribedInstructors.includes(instructorId)) {
      console.log(`${role} is subscribed to the instructor`);
      return true;
    }

    console.log(`${role} is not subscribed to the instructor`);
    return false;
  } catch (err) {
    console.error('Error checking subscription:', err);
    return false;
  }
};

module.exports.getInstructorWithId = async (req, res) => {
  const { id } = req.params;
  try {
    const instructor = await Instructor.findOne(
      { _id: id, isApproved: true },
      "_id username profileImage subscriberCount videoLectures courses"
    )
      .populate({
        path: "videoLectures",
        select: "_id title description duration thumbnail",
        options: { limit: 8 },
      })
      .populate({
        path: "courses",
        select: "-sections", // Exclude sections
        options: { limit: 8 },
      });
    // .populate({
    //   path: 'courses',
    //   select: '_id title description duration thumbnail price rating enrollmentCount category level',
    //   options: { lean: true }
    // });

    const isSubscribed = await checkSubscription(req.user.id, id, req.user.role);
    const isOwner = id == req.user.id;

    console.log(isSubscribed);

    console.log(instructor);
    res.json({
      instructor: instructor,
      isSubscribed: isSubscribed,
      isOwner: isOwner
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "error occured"
    })
  }
};


module.exports.subscribeInstructor = async (req, res) => {
  try {
    const instructorId = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;

    if (instructorId == userId) {
      return res.status(400).json({
        error: "You can't subscribe yourself"
      });
    }

    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return res.status(400).json({
        error: "Invalid instructor"
      });
    }

    let updatedUser;

    if (role === "user" || role === "instructor" || role === "admin") {
      if (role === "user") {
        updatedUser = await User.findByIdAndUpdate(
          userId,
          { $push: { subscribedInstructors: instructorId } },
          { new: true }
        );
      } else if (role === "instructor") {
        updatedUser = await Instructor.findByIdAndUpdate(
          userId,
          { $push: { subscribedInstructors: instructorId } },
          { new: true }
        );
      } else if (role === "admin") {
        updatedUser = await Admin.findByIdAndUpdate(
          userId,
          { $push: { subscribedInstructors: instructorId } },
          { new: true }
        );
      }

      if (updatedUser) {
        console.log('User updated successfully:', updatedUser);

        const updatedInstructor = await Instructor.findByIdAndUpdate(
          instructorId,
          {
            $addToSet: { subscribers: userId }, // Ensure unique subscribers
          },
          { new: true }
        );
        
        const updatedSubscriberCount = updatedInstructor ? updatedInstructor.subscribers.length : 0;
        
        await Instructor.findByIdAndUpdate(
          instructorId,
          {
            $set: { subscriberCount: updatedSubscriberCount },
          },
          { new: true }
        );

        return res.status(200).json({
          ok: true,
          updatedSubscriberCount: updatedSubscriberCount,
          message: "Subscribed successfully"
        });
      } else {
        console.log('User not found');
      }
    } else {
      return res.status(400).json({
        error: "Invalid user role"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: "Error occurred"
    });
  }
};



module.exports.unsubscribeInstructor = async (req, res) => {
  try {
    const instructorId = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;

    if (instructorId == userId) {
      return res.status(400).json({
        error: "You can't unsubscribe yourself"
      });
    }

    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return res.status(400).json({
        error: "Invalid instructor"
      });
    }

    if (role === "user" || role === "instructor" || role === "admin") {
      let updatedUser;

      if (role === "user") {
        updatedUser = await User.findByIdAndUpdate(
          userId,
          { $pull: { subscribedInstructors: instructorId } },
          { new: true }
        );
      } else if (role === "instructor") {
        updatedUser = await Instructor.findByIdAndUpdate(
          userId,
          { $pull: { subscribedInstructors: instructorId } },
          { new: true }
        );
      } else if (role === "admin") {
        updatedUser = await Admin.findByIdAndUpdate(
          userId,
          { $pull: { subscribedInstructors: instructorId } },
          { new: true }
        );
      }

      if (updatedUser) {
        console.log('User updated successfully:', updatedUser);

        const updatedInstructor = await Instructor.findByIdAndUpdate(
          instructorId,
          {
            $pull: { subscribers: userId },
          },
          { new: true }
        );

        const updatedSubscriberCount = updatedInstructor ? updatedInstructor.subscribers.length : 0;

        await Instructor.findByIdAndUpdate(
          instructorId,
          {
            $set: { subscriberCount: updatedSubscriberCount },
          },
          { new: true }
        );


        return res.status(200).json({
          ok: true,
          updatedSubscriberCount: updatedSubscriberCount,
          message: "unsubscribed successfully"
        });
      } else {
        console.log('User not found');
      }
    } else {
      return res.status(400).json({
        error: "Invalid user role"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: "Error occurred"
    });
  }
};
