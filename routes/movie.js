const express = require("express");
const movieController = require("../controllers/movie");
const { authentication } = require("../middleware/auth");
const router = express.Router();

router.get("/", authentication, async (req, res) => {
  const movies = await movieController.all();

  res.render("../views/home/index", {
    movies: movies,
    isAuth: req.isAuth,
  });
});

router.get("/movie/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const movie = await movieController.getById(id);
  res.render("../views/movie/getById", {
    movie,
    isAuth: req.isAuth,
  });
});

router.get("/addMovie", authentication, (req, res) => {
  res.render("../views/movie/add", { isAuth: req.isAuth });
});

router.post("/addMovie", authentication, (req, res) => {
  const { title, description, year, date, genre, image } = req.body;
  movieController.addMovie(title, description, year, date, genre, image);
  res.redirect("/");
});

module.exports = router;
