const express = require("express");
const movieController = require("../controllers/movie");
const { authentication } = require("../middleware/auth");
const router = express.Router();

const jwtDecode = require("jwt-decode");

router.get("/", authentication, async (req, res) => {
  const movies = await movieController.all();
  const sliderMovies = await movieController.latestMovies();

  res.render("../views/home/index", {
    movies: movies,
    slider: sliderMovies,
    isAuth: req.isAuth,
  });
});

router.get("/movie/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const movie = await movieController.getById(id);
  const comments = await movieController.getComments(id);
  res.render("../views/movie/getById", {
    movie,
    comments,
    isAuth: req.isAuth,
  });
});

router.get("/addMovie", authentication, (req, res) => {
  res.render("../views/movie/add", { isAuth: req.isAuth });
});

router.post("/addMovie", authentication, (req, res) => {
  const { title, description, year, date, genre, image, video } = req.body;
  movieController.addMovie(title, description, year, date, genre, image, video);
  res.redirect("/");
});

router.post("/movie/addComment", authentication, (req, res) => {
  const { id, bodyComment } = req.body;
  const userId = getUserId(req);
  movieController.addComment(userId, id, bodyComment);
  res.redirect("/movie/" + id);
});

function getUserId(req) {
  const token = req.cookies["userToken"];
  const decode = jwtDecode(token);
  return decode.userID;
}

module.exports = router;
