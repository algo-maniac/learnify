const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      min: 4,
      max: 10,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    isTeacher: {
      type: Boolean,
      require: true,
    },
    profileImage:{
      type:String
    },
    videoInfo:{
      type:Array
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
