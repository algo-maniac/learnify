const mongoose = require('mongoose');

const Image = new mongoose.Schema({
    img: {
        type: String
    }
})
module.exports = mongoose.model('post', Image);