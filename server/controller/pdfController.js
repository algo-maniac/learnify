const http = require("http");
const express = require("express");
const Instructor = require("../models/instructor");
const { VideoLecture } = require("../models/videoLecture");
const Course = require("../models/course");
const Section = require("../models/section");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Post = require("../models/post");
const mongoose = require("mongoose");
const ffmpeg = require("fluent-ffmpeg");
const streamifier = require("streamifier");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const { getVideoDurationInSeconds } = require("get-video-duration");
const cloudinary = require("cloudinary").v2;
const YoutubeSchema=require("../models/youtube")
module.exports.uploadYoutube = async (req, res) => {
    const {channelname,channellink,channelImgurl,username}=req.body;
    console.log(req.body)
    try{
        const youtube=new YoutubeSchema({
            channel:channelname,
            channelLink:channellink,
            imageUrl:channelImgurl,
            username:username
        });
        const result=youtube.save();
        console.log(result)
        res.json({msg:"Channel added"})
    }catch(er){
        console.log("Error occured")
    }
};
module.exports.getyoutube = async (req, res) => {
    const category=req.params.category;
    console.log(category)
    try{
        const result=await YoutubeSchema.find({category:category})
        return res.json({data:result})
    }catch(er){
        console.log("Error occured",er)
    }
};

module.exports.uploadpdf = async (req, res) => {
    console.log("Insisde");
    const file=req.file;
    const title=req.body.title;
    console.log(title)
    try{
        
    }catch(er){

    }
};

