const actorService = require("../services/actorService");

module.exports.getAll = async function () {
  const all = await actorService.getAll();
  return all;
};

module.exports.add = async function (name, image, resultMovies) {
  await ActorService.add(name, image, resultMovies);
};

module.exports.getById = async function (id) {
  const actor = await actorService.getById(id);
  return actor;
};
