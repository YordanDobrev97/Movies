function authentication(req, res, next) {
  req.isAuth = req.cookies["userToken"];
  next();
}

module.exports = {
  authentication,
};
