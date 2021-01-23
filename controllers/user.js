const userService = require("../services/userService");

module.exports.create = async function (username, password, confirmPassword) {
  return userService.register(username, password, confirmPassword);
};
