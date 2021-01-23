const mongoose = require("../config/db");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  role: String,
});

userSchema.methods.matchPassword = function () {};

const User = mongoose.model("User", userSchema);

module.exports = User;
