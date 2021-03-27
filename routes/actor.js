const express = require("express");
const { authentication } = require("../middleware/auth");
const { route } = require("./movie");
const ActorService = require("../services/actorService");
const router = express.Router();

router.get("/", authentication, async (req, res) => {
  const actors = await ActorService.getAll();
  res.render("../views/actors/index", {
    isAuth: req.isAuth,
    actors,
  });
});

router.get("/add", authentication, (req, res) => {
  res.render("../views/actors/add", {
    isAuth: req.isAuth,
  });
});

router.post("/add", authentication, async (req, res) => {
  let { name, movies, image } = req.body;
  const resultMovies = movies.split(", ");
  await ActorService.add(name, image, resultMovies);
  res.redirect("/actors");
});

module.exports = router;
