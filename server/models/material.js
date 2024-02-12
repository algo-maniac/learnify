const mongoose = require("mongoose");

const material = new mongoose.Schema({
  title: { type: String},
  link: { type: String},
  username: { type: String},
  category: { type: String},
}, { 
  timestamps: true 
});

const Material = mongoose.model("material", material);

module.exports = Material;
