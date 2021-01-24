const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const movieController = require("./controllers/movie");
const userController = require("./controllers/user");

const port = 5000;

app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const movies = await movieController.all();
  const isAuth = req.cookies["userToken"] ? true : false;
  res.render(__dirname + "/views/home/index", {
    movies: movies,
    isAuth: isAuth,
  });
});

app.get("/movie/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await movieController.getById(id);
  res.render(__dirname + "/views/movie/getById", { movie });
});

app.get("/addMovie", (req, res) => {
  res.render(__dirname + "/views/movie/add");
});

app.get("/login", (req, res) => {
  res.render(__dirname + "/views/user/login");
});

app.get("/register", (req, res) => {
  res.render(__dirname + "/views/user/register");
});

app.post("/addMovie", (req, res) => {
  const { title, description, year, date, genre, image } = req.body;
  movieController.addMovie(title, description, year, date, genre, image);
  res.redirect("/");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const token = await userController.login(username, password);
  if (token) {
    res.cookie("userToken", token);
  }
  res.redirect("/");
});

app.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  const token = await userController.create(
    username,
    password,
    confirmPassword
  );
  res.cookie("userToken", token);
  res.redirect("/login");
});

app.listen(port, console.log(`Server started at port ${port}`));
