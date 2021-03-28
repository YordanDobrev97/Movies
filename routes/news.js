const express = require("express");
const { authentication } = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin");
const newsController = require("../controllers/news");
const router = express.Router();

router.get("/", authentication, isAdmin, async (req, res) => {
  const news = await newsController.getAll();
  res.render("../views/news/index", {
    isAuth: req.isAuth,
    isAdmin: req.isAdmin,
    news,
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

module.exports = router;
