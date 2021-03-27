const actorService = require("../services/actorService");

module.exports.getById = async function (id) {
  const actor = await actorService.getById(id);
  return actor;
};
