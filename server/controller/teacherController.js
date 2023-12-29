const Post = require("../models/post");
const mongoose = require("mongoose");
const { Readable } = require('stream');

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'doubts',
    });
});

module.exports.uploadVideo = (req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const title = req.body.title;
    const videoUrl = req.body.videourl;
    const image = req.file.path;
    const videoObj = {
        title: title,
        videoUrl: videoUrl,
        thumbnail: image,
    };
    // console.log(videoObj);
    User.findOne({ email: email }).then((result) => {
        // pushing details of video uploaded
        result.videoInfo.push(videoObj);
        result.save().then((data) => {
            if (data) {
                res.json({ msg: "Video Uploaded" });
            } else {
                res.json({ msg: "error in uploading" });
            }
        });
    });
}

module.exports.getAllTeachers = (req, res, next) => {
    User.find({ role: 'teacher' }).then((data) => {
        res.json({ data: data });
    });
}

module.exports.getTeacherWithId = (req, res, next) => {
    const id = req.params["id"];
    console.log(id);
    User.find({ role: "teacher", _id: id }).then((data) => {
        res.json({ data: data });
    });
}