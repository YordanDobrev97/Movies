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

module.exports.getById = async function (id) {
  const actor = await Actor.findOne({ _id: id }).lean();
  const movies = await getMovies(actor);
  return {
    name: actor.name,
    image: actor.image,
    movies,
  };
};

async function getMoviesIds(movies) {
  const resultMovies = [];

  for (const name of movies) {
    const obj = await Movie.findOne({ name: name }, "id").lean();
    resultMovies.push(obj._id);
  }

  return resultMovies;
}

async function getMovies(actor) {
  const resultMovies = [];

  for (const id of actor.movies) {
    const obj = await Movie.findOne({ _id: id }, "id name").lean();
    resultMovies.push({
      movieId: obj._id,
      movieName: obj.name,
    });
  }

  return resultMovies;
}
