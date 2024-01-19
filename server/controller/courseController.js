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
    const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          reject(error);
        } else {
          console.log(result);
          if (result && result.secure_url) {
            resolve(result.secure_url);
          } else {
            reject(new Error("Cloudinary upload result is missing 'secure_url'."));
          }
        }
      });

    uploadStream.end(file.buffer);
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
      thumbnail: thumbnailUrl
    });

    course.save();

    res.status(200).json({
      ok: true,
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
      section: section
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "There is some problem at our end"
    })
  }
}


module.exports.getCourse = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const course = await Course.findById(id)
      .populate({
        path: 'sections',
        populate: {
          path: 'videoLectures',
          model: 'VideoLecture',
          select: '_id courseId sectionId title description duration thumbnail videoFile createdAt updatedAt', 
        },
        select: '_id courseid title description', 
      })
      .exec();


    console.log(course);
    if (!course) {
      res.status(400).json({
        ok: false,
        error: "Invalid courseId"
      })
      return;
    }
    console.log(course);
    res.status(200).json({
      ok: true,
      course: course
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      error: "Internal Server Error"
    })
  }
}


module.exports.editBasicCourseDetails = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title, description, duration, price, level, category } = req.body;
    const thumbnail = req.file;
    let thumbnailUrl;
    if(thumbnail) {
      thumbnailUrl = await uploadToCloudinary(thumbnail);
    }
    console.log(thumbnail);
    console.log(req.body);
    console.log(courseId);
    console.log(thumbnailUrl);

    const updateFields = {};
    if(title) updateFields.title = title;
    if(description) updateFields.description = description;
    if(duration) updateFields.duration = duration;
    if(price) updateFields.price = price;
    if(level) updateFields.level = level;
    if(category) updateFields.category = category;
    if(thumbnail) updateFields.thumbnail = thumbnailUrl;

    const course = await Course.findByIdAndUpdate(courseId, { $set: updateFields }, {new: true});
    
    res.status(200).json({
      ok: true,
      course: {
        _id: course._id,
        title: course.title,
        description: course.description,
        duration: course.duration,
        price: course.price,
        category: course.category,
        thumbnail: course.thumbnail
      }
    });
    return;
  } catch(err) {
    console.log(err);
    res.status(500).json({
      error: "Error occured"
    });
  }
}


module.exports.editSectionDetails = async (req, res) => {
  try {
    const { courseId, sectionId } = req.params;
    console.log(req.body);
    const { title, description } = req.body;


    const updateFields = {};
    if(title) updateFields.title = title;
    if(description) updateFields.description = description;
    console.log(updateFields);

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $set: updateFields },
      { new: true }
    );
    console.log(updatedSection)
    res.status(200).json({
      ok: true,
      updatedSection: {
        title: updatedSection.title,
        description: updatedSection.description
      }
    });
    return;
  } catch(err) {
    console.log(err);
    res.status(500).json({
      error: "Error occured"
    });
  }
}


module.exports.editVideoDetails = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { title, description } = req.body;

    let videoFile, thumbnail, thumbnailUrl, videoFileUrl, duration;

    if(req.files['video'] && req.files['video'][0]) {
      videoFile = req.files['video'][0];
      videoFileUrl = await uploadToCloudinary(videoFile);
      const videoStream = streamifier.createReadStream(videoFile.buffer);
      duration = await getVideoDurationInSeconds(videoStream);
    }

    if(req.files['thumbnail'] && req.files['thumbnail'][0]) {
      thumbnail = req.files['thumbnail'][0];
      thumbnailUrl = await uploadToCloudinary(thumbnail);
    }
    
    const updateFields = {};
    if(title) updateFields.title = title;
    if(description) updateFields.description = description;
    if(videoFile) updateFields.videoFile = videoFileUrl;
    if(duration) updateFields.duration = duration;
    if(thumbnail) updateFields.thumbnail = thumbnailUrl;


    const video = await VideoLecture.findByIdAndUpdate(
      videoId,
      { $set: updateFields },
      { new: true }
    )
    console.log(video);
    
    res.status(200).json({
      ok: true,
      video: video
    });
    return;
  } catch(err) {
    console.log(err);
    res.status(500).json({
      error: "Error occured"
    });
  }
}

module.exports.deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    // Find the video by videoId
    const video = await VideoLecture.findById(videoId);

    if (!video) {
      return res.status(404).json({
        error: 'Video not found',
      });
    }

    const sectionId = video.sectionId;
    // Find the section by sectionId
    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        error: 'Section not found',
      });
    }

    // Remove the video from the section's videoLectures array
    section.videoLectures.pull({ _id: videoId });

    // Save the updated section
    await section.save();

    // Delete the video from the VideoLecture collection
    await VideoLecture.findByIdAndRemove(videoId);

    res.status(200).json({
      ok: true,
      message: 'Video deleted successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Error occurred while deleting the video',
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
        error: 'Section not found',
      });
    }

    const courseId = section.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        error: 'Course not found',
      });
    }

    course.sections.pull({ _id: sectionId });

    await course.save();

    await Section.findByIdAndRemove(sectionId);

    res.status(200).json({
      ok: true,
      message: 'Section deleted successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Error occurred while deleting the video',
    });
  }
};




module.exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        error: 'Course not found',
      });
    }

    await Course.findByIdAndRemove(courseId);

    res.status(200).json({
      ok: true,
      message: 'Section deleted successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Error occurred while deleting the video',
    });
  }
};

