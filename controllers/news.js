const newsService = require("../services/newsService");

module.exports.getAll = async function () {
  const news = await newsService.getAll();
  return news;
};
