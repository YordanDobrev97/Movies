const express = require("express");
const path = require("path");
const { authentication } = require("../middleware/auth");
const router = express.Router();

const layoutPath = path.join(__dirname, "../views/", "/admin/index");

router.get("/", authentication, async (req, res) => {
  res.render("../views/admin/index", { layout: layoutPath });
});

module.exports = router;
