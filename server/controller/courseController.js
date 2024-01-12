const Admin = require("../models/admin");
const mongoose = require("mongoose");
const { Readable } = require('stream');

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'doubts',
    });
});

module.exports.signuppost = async (req, res) => {
  const { username, email, password } = req.body;
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

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "User with this eamil alread exists!"
      })
      return;
    }

    const admin = new Admin({
      username: username,
      email: email,
      password: hashedPassword,
      profileImage: objectId,
    });

    await admin.save();
    console.log(admin);
    const token = jwt.sign({ email: admin.email, role: "admin" }, process.env.ADMIN_JWT_SECRET, { expiresIn: '1h' });
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
    const admin = await Admin.findOne({ email: email });
    // console.log("admin" + admin);
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!admin) {
      res.status(404).send("User Not Present");
      return;
    }
    if (!validPassword) {
      res.status(404).send("Invalid Password");
      return;
    }

    const token = jwt.sign({ email: admin.email, role: "admin" }, process.env.ADMIN_JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: "Login successfull",
      token: token
    });
  } catch (err) {
    console.log(err);
  }
};


module.exports.getAdminData = async (req, res) => {
  const token = req.headers.token;
  try {
    const data = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    const email = data.email;
    const admin = await User.findOne({ email });
    // console.log("admin:   ---------" + admin);
    return res.status(200).json({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: "admin",
      profileImage: admin.profileImage
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Authorization failed"
    })
  }

}

module.exports.getAdminProfileImage = async(req, res) => {
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



