const connectionString = `mongodb://localhost:27017/filmi`;
const mongoose = require("mongoose");

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => console.log("Connection to database!"));

const movieSchema = new mongoose.Schema({
  name: String,
  descrption: String,
  genre: String,
  year: Number,
  imageUrl: String,
  date: Date,
  actors: Array,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
