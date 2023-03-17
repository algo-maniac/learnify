const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
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
