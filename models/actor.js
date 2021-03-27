const mongoose = require("../config/db");

const actorSchema = new mongoose.Schema({
  name: String,
  image: String,
  movies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;
