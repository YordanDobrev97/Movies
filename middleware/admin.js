const userService = require("../services/userService");

function isAdmin(req, res, next) {
  const result = userService.isAdmin(req);
  req.isAdmin = result === "Admin";
  next();
}

module.exports = {
  isAdmin,
};
