const News = require("../models/news");

module.exports.getAll = async function () {
  const all = await News.find({}, null, { lean: true }).sort({ date: "desc" });
  return all;
};

module.exports.addNews = async function (title, content, image, source) {
  const news = new News({ title, content, image, source });
  await news.save();
};
