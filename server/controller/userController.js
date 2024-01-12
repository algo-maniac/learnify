const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Readable } = require('stream');

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });
});

module.exports.signuppost = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const profileImage = req.file;

    const profileImageUrl = await uploadToCloudinary(profileImage);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "User with this eamil alread exists!"
      })
      return;
    }

    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
      profileImage: profileImageUrl,
    });

    await user.save();
    console.log(user);
    const token = jwt.sign({ email: user.email, role: "user" }, process.env.USER_JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: "SignUp successfull",
      token: token
    });
  } catch (err) {
    console.log(err);
  }
}


module.exports.loginpost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log("user" + user);
    const validPassword = await bcrypt.compare(password, user.password);
    if (!user) {
      res.status(404).send("User Not Present");
      return;
    }
    if (!validPassword) {
      res.status(404).send("Invalid Password");
      return;
    }

    const token = jwt.sign({ email: user.email, role: "user" }, process.env.USER_JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: "Login successfull",
      token: token
    });
  } catch (err) {
    console.log(err);
  }
};


module.exports.getUserData = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: "user",
      profileImage: user.profileImage
    });
    
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Authorization failed"
    })
  }
}


