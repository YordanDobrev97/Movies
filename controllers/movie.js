const Movie = require("../models/movie");
const path = require("path");

module.exports.addMovie = function (
  title,
  description,
  year,
  date,
  genre,
  imageUrl
) {
  const newMovie = new Movie(
    title,
    description,
    genre,
    year,
    imageUrl,
    date,
    []
  );
  newMovie.save();
};

module.exports.all = function () {
  const movies = require(path.join(__dirname, "../", "/config/database.json"));
  return movies;
};

module.exports.getById = function (id) {
  const movies = this.all();
  const movie = movies.filter((x) => x.id == id)[0];
  return movie;
};
