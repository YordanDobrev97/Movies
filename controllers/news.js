const newsService = require("../services/newsService");

module.exports.getAll = async function () {
  const news = await newsService.getAll();
  return news;
};

module.exports.getById = async function (id) {
  const newsById = await newsService.getById(id);
  return newsById;
};
