const movieService = require("../services/movieService");

module.exports.all = async function () {
  const movies = await movieService.getAll();
  return movies;
};

module.exports.search = async function (genre) {
  const movies = await movieService.searchByGenre(genre);
  return movies;
};

module.exports.getById = async function (id, userId) {
  const movie = await movieService.findById(id);
  const comments = await movieService.getComments(id, userId);
  return { movie, comments };
};

module.exports.latestMovies = async function () {
  const latestMovies = await movieService.getLatesMovies();
  return latestMovies;
};

module.exports.addComment = async function (userId, movieId, body) {
  await movieService.addComment(userId, movieId, body);
};

module.exports.getComments = async function (movieId) {};
