const User = require("../models/user");
const bcrypt = require("bcrypt");
const jtw = require("jsonwebtoken");

const privateKey = "secret";

module.exports.register = async function (username, password, confirmPassword) {
  if (password !== confirmPassword) {
    return null;
  }

  const salt = await bcrypt.genSalt(8);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username: username,
    password: hashPassword,
  });

  const userObj = await newUser.save();
  const token = jtw.sign(
    {
      userID: userObj._id,
      username: userObj.username,
    },
    privateKey
  );
  return token;
};
