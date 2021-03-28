const News = require("../models/news");

module.exports.addNews = async function (title, content, source) {
  const news = new News({ title, content, source });

  await news.save();
};
