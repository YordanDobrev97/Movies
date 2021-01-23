const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const port = 5000;

const movieController = require("./controllers/movie");
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const movies = await movieController.all();
  res.render(__dirname + "/views/home/index", { movies: movies });
});

app.get("/movie/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await movieController.getById(id);
  res.render(__dirname + "/views/movie/getById", { movie });
});

app.get("/addMovie", (req, res) => {
  res.render(__dirname + "/views/movie/add");
});

app.post("/addMovie", (req, res) => {
  const { title, description, year, date, genre, image } = req.body;
  movieController.addMovie(title, description, year, date, genre, image);
  res.redirect("/");
});

app.listen(port, console.log(`Server started at port ${port}`));
