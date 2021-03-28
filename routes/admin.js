const express = require("express");
const path = require("path");
const { authentication } = require("../middleware/auth");
const adminController = require("../controllers/admin");
const router = express.Router();

const layoutPath = path.join(__dirname, "../views/", "/admin/main");

router.get("/", authentication, async (req, res) => {
  res.render("../views/admin/index", { layout: layoutPath });
});

router.get("/addNewActor", authentication, (req, res) => {
  res.render("../views/admin/addActor", { layout: layoutPath });
});

router.get("/addToMovie", authentication, (req, res) => {
  res.render("../views/admin/addActorToMovie", { layout: layoutPath });
});

router.post("/addNewActor", authentication, async (req, res) => {
  let { name, image } = req.body;
  await adminController.add(name, image);
  res.redirect("/actors");
});

router.post("/addToMovie", authentication, async (req, res) => {
  const { actorName, movieName } = req.body;
  await adminController.addActorToMovie(actorName, movieName);
  res.redirect("/");
});

module.exports = router;
