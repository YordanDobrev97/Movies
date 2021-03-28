const actorService = require("../services/actorService");
const movieService = require("../services/movieService");
const newsService = require("../services/newsService");

const scrapper = require("../scrapper/index");

module.exports.add = async function (name, image) {
  await actorService.add(name, image, []);
};

module.exports.addActorToMovie = async function (actorName, movieName) {
  await actorService.addActorToMovie(actorName, movieName);
};

module.exports.addMovie = async function (
  title,
  description,
  year,
  date,
  genre,
  imageUrl,
  shortVideo
) {
  await movieService.add(
    title,
    description,
    genre,
    year,
    imageUrl,
    date,
    [],
    shortVideo
  );
};

module.exports.addNews = async function (url) {
  const data = await scrapper(url);
  console.log(data);
  await newsService.addNews(data.title, data.content, "variety");
};
