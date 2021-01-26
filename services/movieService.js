const Movie = require("../models/movie");
const Comment = require("../models/comment");

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
    id: movie._id,
    name: movie.name,
    descrption: movie.descrption,
    year: movie.year,
    imageUrl: movie.imageUrl,
  };
};

module.exports.getLatesMovies = async function () {
  const movies = await Movie.find({}, null, { lean: true })
    .sort({ date: "desc" })
    .limit(6);
  return movies;
};

module.exports.addComment = async function (userId, movieId, content) {
  const comment = new Comment({
    content,
    userId,
    movieId,
  });

  await comment.save();
};
