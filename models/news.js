const mongoose = require("../config/db");

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  Source: String,
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
