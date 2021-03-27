const Actor = require("../models/actor");
const Movie = require("../models/movie");

module.exports.getAll = async function () {
  const actors = await Actor.find({}, null, { lean: true });
  return actors;
};

module.exports.add = async function (name, image, movies) {
  const resultMovies = await getMoviesIds(movies);
  const newActor = new Actor({ name, image, movies: resultMovies });
  await newActor.save();
};
async function getMoviesIds(movies) {
  const resultMovies = [];

  for (const name of movies) {
    const obj = await Movie.findOne({ name: name }, "id").lean();
    resultMovies.push(obj._id);
  }

  return resultMovies;
}
