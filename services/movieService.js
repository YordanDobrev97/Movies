const Movie = require("../models/movie");
const Comment = require("../models/comment");

module.exports.getAll = async function () {
  const all = await Movie.find({}, null, { lean: true }).sort({ date: "desc" });
  return all;
};

module.exports.add = async function (
  name,
  descrption,
  genre,
  year,
  imageUrl,
  date,
  actors,
  videoShort
) {
  const movie = new Movie({
    name,
    descrption,
    genre,
    year,
    imageUrl,
    date,
    actors,
    videoShort,
  });

  await movie.save();
};

module.exports.searchByGenre = async function (genre) {
  const movies = await Movie.find(
    { genre: genre },
    "id name descrption imageUrl"
  ).lean();
  return movies;
};

module.exports.findById = async function (id) {
  const movie = await Movie.findOne({ _id: id }).lean();
  return {
    id: movie._id,
    name: movie.name,
    descrption: movie.descrption,
    year: movie.year,
    imageUrl: movie.imageUrl,
    videoShort: movie.videoShort,
  };
};

module.exports.getLatesMovies = async function () {
  const movies = await Movie.find({}, null, { lean: true })
    .sort({ _id: "desc" })
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

module.exports.getComments = async function (movieId) {
  const comments = await Comment.find({ movieId: movieId }).lean();
  return comments;
};
