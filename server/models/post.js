const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
    },
    img:{
        type:String
    },
    question:{
        type:String,
        required:true
    },
    comments:{
        type:Array
    }
})

module.exports=mongoose.model('post',Post);