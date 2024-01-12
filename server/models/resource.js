const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    file: { type: String, required: true },
  });
  
const Resource = mongoose.model('Resource', ResourceSchema);

module.exports = Resource;
