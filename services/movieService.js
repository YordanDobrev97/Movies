const Movie = require("../models/movie");

module.exports.getAll = async function () {
  const all = await Movie.find({}, null, { lean: true });
  return all;
};

module.exports.add = async function (
  name,
  descrption,
  genre,
  year,
  imageUrl,
  date,
  actors
) {
  const movie = new Movie({
    name,
    descrption,
    genre,
    year,
    imageUrl,
    date,
    actors,
  });
  await movie.save();
};

module.exports.findById = async function (id) {
  const movie = await Movie.findOne({ _id: id });
  return {
    name: movie.name,
    descrption: movie.descrption,
    year: movie.year,
    imageUrl: movie.imageUrl,
  };
};
