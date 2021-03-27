const User = require("../models/user");
const bcrypt = require("bcrypt");
const jtw = require("jsonwebtoken");

const privateKey = "secret";
const jwtDecode = require("jwt-decode");

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
  const token = generateToken(userObj);
  return token;
};

module.exports.login = async function (username, password) {
  const user = await User.findOne({ username: username }).lean();
  const result = await bcrypt.compare(password, user.password);

  if (result) {
    const token = generateToken(user);
    return token;
  }
  return null;
};
function generateToken(userObj) {
  return jtw.sign(
    {
      userID: userObj._id,
      username: userObj.username,
      isAdmin: userObj.role || undefined,
    },
    privateKey
  );
}

module.exports.getUserId = function getUserId(req) {
  const decodeToken = decode(req);
  return decodeToken.userID;
};

module.exports.isAdmin = function (req) {
  const decodeToken = decode(req);
  return decodeToken.isAdmin;
};

function decode(req) {
  const token = req.cookies["userToken"];
  const decode = jwtDecode(token);
  return decode;
}
