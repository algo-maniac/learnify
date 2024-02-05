const mongoose = require("mongoose");

const youtubeSchema = new mongoose.Schema({
  channel: { type: String},
  channelLink: { type: String},
  imageUrl: { type: String },
  username: { type: String},  
  category:{type:String}
}, { 
  timestamps: true 
});

const YoutubeSchema = mongoose.model("youtube", youtubeSchema);

module.exports = YoutubeSchema;
