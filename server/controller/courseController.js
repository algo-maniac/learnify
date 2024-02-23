const Instructor = require("../models/instructor");
const { VideoLecture } = require("../models/videoLecture");
const Course = require("../models/course");
const Section = require("../models/section");
const jwt = require("jsonwebtoken");
const streamifier = require("streamifier");
const { getVideoDurationInSeconds } = require("get-video-duration");
const User = require("../models/user");
const Admin = require("../models/admin");
const { ObjectId } = require("mongoose").Types;
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

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

module.exports.getCourses = async (req, res) => {
  try {
    const pageSize = 5;
    const { offset } = req.body;

    const coursesQuery = await Course.find()
      .sort({ createdAt: -1 })
      .skip((offset - 1) * pageSize)
      .limit(pageSize)
      .populate({
        path: "instructorId",
        select: "_id username profileImage",
      })
      .select("-sections");

    const length = await Course.countDocuments();

    return res.status(200).json({
      ok: true,
      courses: coursesQuery,
      length_of_courses: length,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Authorization failed",
    });
  }
};

module.exports.enrollInCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    let enrolledCourses;

    if (req.user.role == "user") {
      // Get the user, instructor, or admin based on the role
      const userOrInstructorOrAdmin = await getModelByRole(
        req.user.role
      ).findById(userId);

      // Check if the courseId is already in the enrolledCourses array
      const courseId = req.params.courseId;
      if (!userOrInstructorOrAdmin.enrolledCourses.includes(courseId)) {
        // If not, push the courseId to the enrolledCourses array
        userOrInstructorOrAdmin.enrolledCourses.push(courseId);
        await userOrInstructorOrAdmin.save();
      }

      enrolledCourses = userOrInstructorOrAdmin.enrolledCourses;
    } else if (req.user.role == "instructor") {
      const userOrInstructorOrAdmin = await getModelByRole(
        req.user.role
      ).findById(userId);

      // Check if the courseId is already in the enrolledCourses array
      const courseId = req.params.courseId;

      if (userOrInstructorOrAdmin.courses.includes(courseId)) {
        // If not, push the courseId to the enrolledCourses array
        return res.status(500).json({
          error: "You are the creator",
        });
      }

      if (!userOrInstructorOrAdmin.enrolledCourses.includes(courseId)) {
        // If not, push the courseId to the enrolledCourses array
        userOrInstructorOrAdmin.enrolledCourses.push(courseId);
        await userOrInstructorOrAdmin.save();
      }

      enrolledCourses = userOrInstructorOrAdmin.enrolledCourses;
    } else {
      return res.status(500).json({
        error: "Invalid role",
      });
    }

    res.status(200).json({
      ok: true,
      enrolledCourses: enrolledCourses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "There is some problem at our end",
    });
  }
};

module.exports.revertEnrollInCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    let enrolledCourses;

    if (req.user.role == "user") {
      // Get the user, instructor, or admin based on the role
      const userOrInstructorOrAdmin = await getModelByRole(
        req.user.role
      ).findById(userId);

      const courseId = req.params.courseId;

      // Check if the courseId is already in the enrolledCourses array
      const indexOfCourse =
        userOrInstructorOrAdmin.enrolledCourses.indexOf(courseId);
      if (indexOfCourse !== -1) {
        // If found, remove the courseId from the enrolledCourses array
        userOrInstructorOrAdmin.enrolledCourses.splice(indexOfCourse, 1);
        await userOrInstructorOrAdmin.save();
      }

      enrolledCourses = userOrInstructorOrAdmin.enrolledCourses;
    } else if (req.user.role == "instructor") {
      const userOrInstructorOrAdmin = await getModelByRole(
        req.user.role
      ).findById(userId);

      // Check if the courseId is already in the enrolledCourses array
      const courseId = req.params.courseId;
      if (userOrInstructorOrAdmin.courses.includes(courseId)) {
        // If not, push the courseId to the enrolledCourses array
        return res.status(500).json({
          error: "You are the creator",
        });
      }
      const indexOfCourse =
        userOrInstructorOrAdmin.enrolledCourses.indexOf(courseId);
      if (indexOfCourse !== -1) {
        // If found, remove the courseId from the enrolledCourses array
        userOrInstructorOrAdmin.enrolledCourses.splice(indexOfCourse, 1);
        await userOrInstructorOrAdmin.save();
      }

      enrolledCourses = userOrInstructorOrAdmin.enrolledCourses;
    } else {
      return res.status(500).json({
        error: "Invalid role",
      });
    }

    res.status(200).json({
      ok: true,
      enrolledCourses: enrolledCourses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "There is some problem at our end",
    });
  }
};

module.exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let courses;
    let totalCourses;

    if (
      req.user.role == "user" ||
      req.user.role == "instructor" ||
      req.user.role == "admin"
    ) {
      const userOrInstructorOrAdmin = await getModelByRole(req.user.role)
        .findById(userId)
        .populate({
          path: "enrolledCourses",
          select: "-sections",
        })
        .exec();
      const pageSize = 6;
      let { offset } = req.body;
      offset--;
      const startIndex = offset * pageSize;
      const endIndex = startIndex + pageSize;

      courses = userOrInstructorOrAdmin.enrolledCourses.slice(
        startIndex,
        endIndex
      );
      totalCourses = userOrInstructorOrAdmin.enrolledCourses.length;
    } else {
      return res.status(500).json({
        error: "Invalid role",
      });
    }

    console.log(courses);
    res.status(200).json({
      ok: true,
      courses: courses,
      totalCourses: totalCourses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "There is some problem at our end",
    });
  }
};

module.exports.getPurchasedCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let courses;
    let totalCourses;

    if (
      req.user.role == "user" ||
      req.user.role == "instructor" ||
      req.user.role == "admin"
    ) {
      const userOrInstructorOrAdmin = await getModelByRole(req.user.role)
        .findById(userId)
        .populate({
          path: "purchasedCourses",
          select: "-sections",
        })
        .exec();
      const pageSize = 6;
      let { offset } = req.body;
      offset--;
      const startIndex = offset * pageSize;
      const endIndex = startIndex + pageSize;

      courses = userOrInstructorOrAdmin.purchasedCourses.slice(
        startIndex,
        endIndex
      );
      totalCourses = userOrInstructorOrAdmin.purchasedCourses.length;
    } else {
      return res.status(500).json({
        error: "Invalid role",
      });
    }

    console.log(courses);
    res.status(200).json({
      ok: true,
      courses: courses,
      totalCourses: totalCourses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "There is some problem at our end",
    });
  }
};

const getModelByRole = (role) => {
  switch (role) {
    case "user":
      return User;
    case "instructor":
      return Instructor;
    case "admin":
      return Admin;
    default:
      return null;
  }
};

module.exports.createCourse = async (req, res) => {
  try {
    const { title, description, duration, price, level, category } = req.body;

    const thumbnail = req.file;
    const thumbnailUrl = await uploadToCloudinary(thumbnail);

    const course = new Course({
      instructorId: req.user.id,
      title: title,
      description: description,
      duration: duration,
      price: price,
      level: level,
      category: category,
      thumbnail: thumbnailUrl,
    });

    course.save();

    const updateResult = await Instructor.findByIdAndUpdate(
      req.user.id,
      { $push: { courses: course._id } },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      message: "Created Course Successfully",
      courseId: course._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "There is some problem at our end",
    });
  }
};

module.exports.createSection = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title, description } = req.body;

    const section = new Section({
      courseId: courseId,
      title: title,
      description: description,
    });

    await section.save();

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { sections: section._id } },
      { new: true }
    );

    console.log(updatedCourse);

    res.status(200).json({
      ok: true,
      message: "Section Course Successfully",
      section: section,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "There is some problem at our end",
    });
  }
};

module.exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;
    const token = req.headers["authorization"];

    let hasAccess = false;
    const courseObjectId = new ObjectId(courseId);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.decode(token);

    if (decoded.role === "admin") {
      hasAccess = true;
    } else if (decoded.role === "instructor") {
      const instructor = await Instructor.findOne({
        _id: new ObjectId(decoded.id),
        isApproved: true,
      });
      if (!instructor) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      console.log(instructor.courses);
      console.log(courseObjectId);
      const hasCourse =
        instructor.courses.includes(courseObjectId) ||
        instructor.enrolledCourses.includes(courseObjectId) ||
        instructor.purchasedCourses.includes(courseObjectId);

      if (hasCourse) {
        hasAccess = true;
      }

      req.user = instructor;
    } else if (decoded.role === "user") {
      const user = await User.findById(new ObjectId(decoded.id));

      console.log(decoded);
      console.log(user);
      if (!user) {
        console.log("no user");
        return res.status(401).json({ message: "Unauthorized" });
      }

      const hasCourse =
        user.enrolledCourses.includes(courseObjectId) ||
        user.purchasedCourses.includes(courseObjectId);

      if (hasCourse) {
        hasAccess = true;
      }
      req.user = user;
    }

    let populateObject = {
      path: "sections",
      populate: {
        path: "videoLectures",
        model: "VideoLecture",
        select:
          "_id courseId sectionId title description duration thumbnail createdAt updatedAt",
      },
      select: "_id courseid title description videoLectures",
    };

    if (!hasAccess) {
      populateObject = {
        path: "sections",
        select: "_id courseid title description",
      };
    }

    const course = await Course.findById(courseId)
      .populate(populateObject)
      .exec();

    console.log(course);
    if (!course) {
      res.status(400).json({
        ok: false,
        error: "Invalid courseId",
      });
      return;
    }
    console.log(course);
    res.status(200).json({
      ok: true,
      course: course,
      hasAccess: hasAccess,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      error: "Internal Server Error",
    });
  }
};

module.exports.getCourseDetailsForEdit = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId)
      .populate({
        path: "sections",
        populate: {
          path: "videoLectures",
          model: "VideoLecture",
          select:
            "_id courseId sectionId title description duration thumbnail videoFile createdAt updatedAt",
        },
        select: "_id courseid title description",
      })
      .exec();

    console.log(course);
    if (!course) {
      res.status(400).json({
        ok: false,
        error: "Invalid courseId",
      });
      return;
    }
    console.log(course);
    res.status(200).json({
      ok: true,
      course: course,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      error: "Internal Server Error",
    });
  }
};

module.exports.editBasicCourseDetails = async (req, res) => {
  try {
    console.log("here1");

    const courseId = req.params.courseId;
    const { title, description, duration, price, level, category } = req.body;
    const thumbnail = req.file;
    let thumbnailUrl;
    if (thumbnail) {
      thumbnailUrl = await uploadToCloudinary(thumbnail);
    }
    console.log(thumbnail);
    console.log(req.body);
    console.log(courseId);
    console.log(thumbnailUrl);
    console.log("here2");

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (duration) updateFields.duration = duration;
    if (price) updateFields.price = price;
    if (level) updateFields.level = level;
    if (category) updateFields.category = category;
    if (thumbnail) updateFields.thumbnail = thumbnailUrl;
    console.log("here3");

    const course = await Course.findByIdAndUpdate(
      courseId,
      { $set: updateFields },
      { new: true }
    );
    console.log("here4");

    res.status(200).json({
      ok: true,
      course: {
        _id: course._id,
        title: course.title,
        description: course.description,
        duration: course.duration,
        price: course.price,
        category: course.category,
        thumbnail: course.thumbnail,
      },
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error occured",
    });
  }
};

module.exports.editSectionDetails = async (req, res) => {
  try {
    const { courseId, sectionId } = req.params;
    console.log(req.body);
    const { title, description } = req.body;

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    console.log(updateFields);

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $set: updateFields },
      { new: true }
    );
    console.log(updatedSection);
    res.status(200).json({
      ok: true,
      updatedSection: {
        title: updatedSection.title,
        description: updatedSection.description,
      },
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error occured",
    });
  }
};

module.exports.uploadCourseVideo = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    const { courseId, sectionId } = req.body;
    if (!courseId || !sectionId) {
      res.status(400).json({ error: "Invalid inputs" });
    }

    const videoFile = req.files["video"][0];
    const thumbnail = req.files["thumbnail"][0];

    const videoFileUrl = await uploadToCloudinary(videoFile);
    const videoStream = streamifier.createReadStream(videoFile.buffer);
    const duration = await getVideoDurationInSeconds(videoStream);

    const thumbnailUrl = await uploadToCloudinary(thumbnail);

    const videoLecture = new VideoLecture({
      instructorId: req.user.id,
      courseId: req.body?.courseId,
      sectionId: req.body?.sectionId,
      title: req.body.title,
      description: req.body.description,
      duration: duration,
      videoFile: videoFileUrl,
      thumbnail: thumbnailUrl,
    });

    const result = await videoLecture.save();
    console.log(result);

    const updatedSection = await Section.findByIdAndUpdate(
      req.body.sectionId,
      { $push: { videoLectures: result._id } },
      { new: true }
    );

    console.log(updatedSection);

    res.status(200).json({
      ok: true,
      message: "Lecture added successfully",
      video: result,
    });
    return;
  } catch (error) {
    console.log("Error uploading video:" + error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.editVideoDetails = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { title, description } = req.body;

    let videoFile, thumbnail, thumbnailUrl, videoFileUrl, duration;

    if (req.files["video"] && req.files["video"][0]) {
      videoFile = req.files["video"][0];
      videoFileUrl = await uploadToCloudinary(videoFile);
      const videoStream = streamifier.createReadStream(videoFile.buffer);
      duration = await getVideoDurationInSeconds(videoStream);
    }

    if (req.files["thumbnail"] && req.files["thumbnail"][0]) {
      thumbnail = req.files["thumbnail"][0];
      thumbnailUrl = await uploadToCloudinary(thumbnail);
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (videoFile) updateFields.videoFile = videoFileUrl;
    if (duration) updateFields.duration = duration;
    if (thumbnail) updateFields.thumbnail = thumbnailUrl;

    console.log(updateFields);
    console.log(videoFile);
    console.log(thumbnail);
    const video = await VideoLecture.findByIdAndUpdate(
      videoId,
      { $set: updateFields },
      { new: true }
    );
    console.log(video);

    res.status(200).json({
      ok: true,
      video: video,
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error occured",
    });
  }
};

module.exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    await Course.findByIdAndRemove(courseId);

    res.status(200).json({
      ok: true,
      message: "Section deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occurred while deleting the video",
    });
  }
};

module.exports.deleteSection = async (req, res) => {
  try {
    console.log("here");
    const { sectionId } = req.params;

    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        error: "Section not found",
      });
    }

    const courseId = section.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    course.sections.pull({ _id: sectionId });

    await course.save();

    await Section.findByIdAndRemove(sectionId);

    res.status(200).json({
      ok: true,
      message: "Section deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occurred while deleting the video",
    });
  }
};

module.exports.deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await VideoLecture.findById(videoId);

    if (!video) {
      return res.status(404).json({
        error: "Video not found",
      });
    }

    const sectionId = video.sectionId;
    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        error: "Section not found",
      });
    }

    section.videoLectures.pull({ _id: videoId });

    await section.save();

    await VideoLecture.findByIdAndRemove(videoId);

    res.status(200).json({
      ok: true,
      message: "Video deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occurred while deleting the video",
    });
  }
};
