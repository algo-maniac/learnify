const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;