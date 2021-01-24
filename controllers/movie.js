const movieService = require("../services/movieService");

module.exports.addMovie = async function (
  title,
  description,
  year,
  date,
  genre,
  imageUrl
) {
  await movieService.add(title, description, genre, year, imageUrl, date, []);
};

module.exports.all = async function () {
  const movies = await movieService.getAll();
  return movies;
};

module.exports.getById = async function (id) {
  const movie = await movieService.findById(id);
  return movie;
};

module.exports.latestMovies = async function () {
  const latestMovies = await movieService.getLatesMovies();
  return latestMovies;
};
