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
  const { username, email, password, isTeacher } = req.body;
  try {
    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    // Create write stream to GridFS
    const uploadStream = gfs.openUploadStream(req.file.originalname);
    readableStream.pipe(uploadStream);

    // Wait for the upload to finish
    await new Promise((resolve, reject) => {
      uploadStream.on('finish', resolve);
      uploadStream.on('error', reject);
    });

    // Get the ObjectId of the uploaded file
    const objectId = uploadStream.id;

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
      role: isTeacher === 1 ? "teacher" : "student",
      profileImage: objectId,
    });

    await user.save();
    console.log(user);
    const token = jwt.sign({ email: user.email }, "trident-secret", { expiresIn: '1h' });
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

    const token = jwt.sign({ email: user.email }, "trident-secret", { expiresIn: '1h' });
    res.status(200).json({
      message: "Login successfull",
      token: token
    });
  } catch (err) {
    console.log(err);
  }
};


module.exports.getUserData = async (req, res) => {
  const token = req.headers.token;
  try {
    const data = jwt.verify(token, "trident-secret");
    const email = data.email;
    const user = await User.findOne({ email });
    console.log("user:   ---------" + user);
    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Authorization failed"
    })
  }

}

module.exports.getUserProfileImage = async(req, res) => {
  try {
    const objectId = new mongoose.Types.ObjectId(req.params.id);

    // Find the file in GridFS by ObjectId
    const file = await gfs.find({ _id: objectId }).toArray();

    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Set the appropriate content type
    res.set('Content-Type', file[0].contentType);

    // Create a readable stream and pipe it to the response
    const downloadStream = await gfs.openDownloadStream(objectId);

    await downloadStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



