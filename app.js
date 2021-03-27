const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const movieRoute = require("./routes/movie");
const userRoute = require("./routes/user");
const actorRoute = require("./routes/actor");
const adminRoute = require("./routes/admin");
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

app.use("/", movieRoute);
app.use("/actors", actorRoute);
app.use("/user", userRoute);
app.use("/administration", adminRoute);

app.listen(port, console.log(`Server started at port ${port}`));
