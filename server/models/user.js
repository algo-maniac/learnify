const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profileImage: { type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files' },  
  role: {
    type: String,
    enum: ['teacher', 'student'],
    required: true,
    validate: {
      validator: function (value) {
        return ['teacher', 'student'].includes(value);
      },
      message: 'Invalid role value',
    },
  },
  videoInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  },{ timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
