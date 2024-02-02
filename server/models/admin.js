const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    isApproved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
