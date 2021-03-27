const express = require("express");
const { authentication } = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin");
const actorController = require("../controllers/actor");
const ActorService = require("../services/actorService");
const router = express.Router();

router.get("/", authentication, isAdmin, async (req, res) => {
  const actors = await ActorService.getAll();
  res.render("../views/actors/index", {
    isAuth: req.isAuth,
    isAdmin: req.isAdmin,
    actors,
  });
});

router.get("/:id", authentication, isAdmin, async (req, res) => {
  const { id } = req.params;
  const actor = await actorController.getById(id);
  console.log(actor);
  res.render("../views/actors/getById", {
    isAuth: req.isAuth,
    isAdmin: req.isAdmin,
    actor: actor,
  });
});

router.get("/add", authentication, isAdmin, (req, res) => {
  res.render("../views/actors/add", {
    isAuth: req.isAuth,
    isAdmin: req.isAdmin,
  });
});

router.post("/add", authentication, async (req, res) => {
  let { name, movies, image } = req.body;
  const resultMovies = movies.split(", ");
  await ActorService.add(name, image, resultMovies);
  res.redirect("/actors");
});

module.exports = router;
