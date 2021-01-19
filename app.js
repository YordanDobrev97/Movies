const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const port = 5000;
const path = require("path");

app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render(__dirname + "/views/home/index");
});

app.listen(port, console.log(`Server started at port ${port}`));
