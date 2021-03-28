const actorService = require("../services/actorService");

module.exports.add = async function (name, image) {
  await actorService.add(name, image, []);
};

module.exports.addActorToMovie = async function (actorName, movieName) {
  await actorService.addActorToMovie(actorName, movieName);
};
