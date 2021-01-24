const userService = require("../services/userService");

module.exports.create = async function (username, password, confirmPassword) {
  return await userService.register(username, password, confirmPassword);
};

module.exports.login = async function (username, password) {
  return await userService.login(username, password);
};
