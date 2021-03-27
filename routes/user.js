const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/login", (req, res) => {
  res.render("../views/user/login");
});

router.get("/register", (req, res) => {
  res.render("../views/user/register");
});

router.get("/logout", (req, res) => {
  res.clearCookie("userToken");
  res.redirect("/");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const token = await userController.login(username, password);
  if (token) {
    res.cookie("userToken", token);
  }
  res.redirect("/");
});

router.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  const token = await userController.create(
    username,
    password,
    confirmPassword
  );
  res.cookie("userToken", token);
  res.redirect("/user/login");
});

module.exports = router;
