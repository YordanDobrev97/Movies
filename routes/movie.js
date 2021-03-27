const express = require("express");
const movieController = require("../controllers/movie");
const userService = require("../services/userService");
const { authentication } = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin");

const router = express.Router();

const jwtDecode = require("jwt-decode");

router.get("/", authentication, isAdmin, async (req, res) => {
  const movies = await movieController.all();
  const sliderMovies = await movieController.latestMovies();

  res.render("../views/home/index", {
    movies: movies,
    slider: sliderMovies,
    isAuth: req.isAuth,
    isAdmin: req.isAdmin,
  });
});

router.get("/movie/:id", authentication, isAdmin, async (req, res) => {
  const { id } = req.params;
  const movie = await movieController.getById(id);
  res.render("../views/movie/getById", {
    movie: movie.movie,
    comments: movie.comments,
    isAuth: req.isAuth,
    isAdmin: req.isAdmin,
  });
});

router.get("/addMovie", authentication, isAdmin, (req, res) => {
  res.render("../views/movie/add", {
    isAuth: req.isAuth,
    isAdmin: req.isAdmin,
  });
});

router.get("/search", authentication, isAdmin, async function (req, res) {
  const { genre } = req.query;
  const searchMovies = await movieController.search(genre.toLowerCase());
  const sliderMovies = await movieController.latestMovies();
  res.render("../views/home/index", {
    movies: searchMovies,
    slider: sliderMovies,
    isAuth: req.isAuth,
    isAdmin: req.isAdmin,
  });
});

router.post("/addMovie", authentication, (req, res) => {
  const { title, description, year, date, genre, image, video } = req.body;
  movieController.addMovie(title, description, year, date, genre, image, video);
  res.redirect("/");
});

router.post("/movie/addComment", authentication, (req, res) => {
  const { id, bodyComment } = req.body;
  const userId = userService.getUserId(req);
  movieController.addComment(userId, id, bodyComment);
  res.redirect("/movie/" + id);
});

module.exports = router;
