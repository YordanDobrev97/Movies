const userService = require("../services/userService");

function isAdmin(req, res, next) {
  const result = userService.isAdmin(req);
  console.log(result);
  if (result === "Admin") {
    req.isAdmin = true;
  }
  next();
}

module.exports = {
  isAdmin,
};
