const YoutubeSchema=require("../models/youtube");
const cloudinary = require("cloudinary").v2;
const Material = require("../models/material");

cloudinary.config({
  cloud_name: process.env.pdf_cloud_name,
  api_key: process.env.pdf_api_key,
  api_secret: process.env.pdf_api_secret,
  secure:true
});

module.exports.uploadpdf = async (req, res) => {
    console.log("Insisde");
    const title=req.body.title;
    const username=req.body.username;
    const category=req.body.category;
    try {
        const result =cloudinary.uploader.upload_stream(
          { resource_type: 'raw' },
          (error, result) => {
            if (error) {
              console.error('Error uploading to Cloudinary:', error);
              return res.status(500).json({ error: 'Error uploading to Cloudinary' });
            }
            const material=new Material({
                link:result.secure_url,
                title:title,
                username:username,
                category:category
            })
            const data=material.save();
            res.json({ msg:"Successfully uploaded pdf"});
          }
        ).end(req.file.buffer);
    
    }catch (error) {
        console.error('Error uploading PDF:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports.uploadYoutube = async (req, res) => {
    const { channelname, channellink, channelImgurl, username } = req.body;
    console.log(req.body)
    try {
        const youtube = new YoutubeSchema({
            channel: channelname,
            channelLink: channellink,
            imageUrl: channelImgurl,
            username: username
        });
        const result = youtube.save();
        console.log(result)
        res.json({ msg: "Channel added" })
    } catch (er) {
        console.log("Error occured")
    }
};
module.exports.getyoutube = async (req, res) => {
    const category = req.params.category;
    console.log(category)
    try{
        const result=await YoutubeSchema.find({category:category});
        const material=await Material.find({category:category});
        return res.json({data:result,material})
    }catch(er){
        console.log("Error occured",er)
    }
};


