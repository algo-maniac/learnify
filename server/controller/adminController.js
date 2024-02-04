const Admin = require("../models/admin");
const Instructor = require("../models/instructor");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;

const conn = mongoose.connection;
let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "doubts",
  });
});

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user, // Your Gmail email address
    pass: process.env.pass, // Your Gmail password or an app-specific password
  },
});

// Function to upload file to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) reject(error);
        resolve(result.secure_url);
      })
      .end(file.buffer);
  });
};

module.exports.signuppost = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("here");
  try {
    const profileImage = req.file;

    const profileImageUrl = await uploadToCloudinary(profileImage);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "User with this eamil alread exists!",
      });
      return;
    }

    const admin = new Admin({
      username: username,
      email: email,
      password: hashedPassword,
      profileImage: profileImageUrl,
    });

    await admin.save();

    return res.status(200).json({
      message: "Registered successfull! Approval pending",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong at our end",
    });
  }
};

module.exports.loginpost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    console.log(admin);
    const validPassword = await bcrypt.compare(password, admin.password);

    if (!admin) {
      return res.status(404).json({
        message: "User Not Present",
      });
    }

    if (!validPassword) {
      return res.status(404).json({
        message: "Invalid Password",
      });
    }

    if (!admin.isApproved) {
      return res.status(400).json({
        message: "Approval Pending",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        role: "admin",
      },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successfull",
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "There is some problem at our end",
    });
  }
};

module.exports.getAdminData = async (req, res) => {
  try {
    const id = req.user.id;
    const admin = await Admin.findById(id);
    console.log(admin);

    return res.status(200).json({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: "admin",
      profileImage: admin.profileImage,
    });
  } catch (err) {
    res.status(404).json({
      message: "Authorization failed",
    });
  }
};

module.exports.approveAccount = async (req, res) => {
  try {
    console.log(req.body);

    const { id, role } = req.body;

    let account;
    switch (role) {
      case "Admin":
        account = await Admin.findByIdAndUpdate(
          id,
          { isApproved: true },
          { new: true }
        );
        break;

      case "Instructor":
        account = await Instructor.findByIdAndUpdate(
          id,
          { isApproved: true },
          { new: true }
        );
        break;

      default:
        return res.status(400).json({
          message: "invalid request",
        });
        break;
    }

    if (!account) {
      return res.status(404).json({ error: "Account not found." });
    }

    // sending approval mail to instructor / admin
    await sendApprovalEmail(account.email, role);

    res.status(200).json({ message: "Account approved successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Account approving instructor." });
  }
};

async function sendApprovalEmail(userEmail, userRole) {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: userEmail,
    subject: "Your Account has been Approved",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Approved</title>
          <style>
              body {
                  margin: 0;
                  padding: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 80vh; /* Adjusted height */
                  background: #f4f4f4;
              }
      
              .container {
                  text-align: center;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
      
              .background-image {
                  background-image: url('your-background-image.jpg');
                  background-size: cover;
                  background-position: center;
                  height: 100px; /* Adjusted height */
                  border-radius: 8px 8px 0 0;
              }
      
              h1 {
                  color: #007bff;
                  margin-top: 20px;
              }
      
              p {
                  font-size: 18px;
                  color: #333;
                  margin: 0;
              }
      
              a {
                  color: #28a745;
                  text-decoration: none;
                  font-weight: bold;
              }
      
              a:hover {
                  text-decoration: underline;
              }
          </style>
      </head>
      
      <body>
      
          <div class="container">
              <div class="background-image"></div>
      
              <!-- Content -->
              <h1>Congratulations!</h1>
              <p>Your ${userRole} account has been approved. You can now <a href="http://localhost:3000/signup" style="color: #28a745; text-decoration: none; font-weight: bold;">log in</a>.</p>
          </div>
      
      </body>
      
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Approval email sent to:", userEmail);
  } catch (error) {
    console.error("Error sending approval email:", error);
    throw error;
  }
}

module.exports.denyAccount = async (req, res) => {
  try {
    console.log(req.body);
    const { id, role } = req.body;
    console.log(id + " " + role);

    let account;
    switch (role) {
      case "Admin":
        account = await Admin.findById(id);
        if (!account) {
          return res.status(404).json({ error: "Account not found." });
        }
        await sendDenialEmail(account.email, role);
        await Admin.deleteOne({ _id: id });
        break;

      case "Instructor":
        account = await Instructor.findById(id);
        if (!account) {
          return res.status(404).json({ error: "Account not found." });
        }
        await sendDenialEmail(account.email, role);
        await Instructor.deleteOne({ _id: id });
        break;

      default:
        return res.status(400).json({
          message: "invalid request",
        });
        break;
    }
    res
      .status(200)
      .json({ message: "Account denied and deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error denying Account." });
  }
};

async function sendDenialEmail(userEmail, userRole) {
  const rejectionMailOptions = {
    from: "your-email@gmail.com",
    to: userEmail,
    html: `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Approval Denied</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 80vh; /* Adjusted height */
                    background: #f4f4f4;
                }

                .container {
                    text-align: center;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                .background-image {
                    background-image: url('your-background-image.jpg');
                    background-size: cover;
                    background-position: center;
                    height: 100px; /* Adjusted height */
                    border-radius: 8px 8px 0 0;
                }

                h1 {
                    color: #dc3545; /* Red color for denial */
                    margin-top: 20px;
                }

                p {
                    font-size: 18px;
                    color: #333;
                    margin: 0;
                }

                a {
                    color: #007bff; /* Blue color for link in denial */
                    text-decoration: none;
                    font-weight: bold;
                }

                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>

        <body>

            <div class="container">
                <div class="background-image"></div>

                <!-- Content -->
                <h1>Account Approval Denied</h1>
                <p>We regret to inform you that your account approval request for ${userRole} role has been denied. If you have any concerns, please <a href="mailto:your-email@gmail.com" style="color: #007bff; text-decoration: none; font-weight: bold;">contact us</a>.</p>
            </div>

        </body>

        </html>
    `,
  };

  try {
    await transporter.sendMail(rejectionMailOptions);
    console.log("Rejection email sent to:", userEmail);
  } catch (error) {
    console.error("Error sending rejection email:", error);
    throw error;
  }
}

module.exports.getPendingRequests = async (req, res) => {
  const pendingInstructors = await Instructor.find({ isApproved: false });
  const pendingAdmins = await Admin.find({ isApproved: false });

  const result1 = pendingInstructors.map((val) => {
    return {
      id: val.id,
      role: "Instructor",
      username: val.username,
      email: val.email,
      profileImage: val.profileImage,
      createdAt: val.createdAt,
      updatedAt: val.updatedAt,
    };
  });
  const result2 = pendingAdmins.map((val) => {
    return {
      id: val.id,
      role: "Admin",
      username: val.username,
      email: val.email,
      profileImage: val.profileImage,
      createdAt: val.createdAt,
      updatedAt: val.updatedAt,
    };
  });

  const result = [...result1, ...result2];

  res.json({
    pendingRequests: result,
  });
};
