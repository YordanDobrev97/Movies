const mongoose = require("../config/db");

const movieSchema = new mongoose.Schema({
  name: String,
  descrption: String,
  genre: String,
  year: Number,
  imageUrl: String,
  date: Date,
  actors: Array,
  videoShort: String,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
