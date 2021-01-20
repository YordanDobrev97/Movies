const fs = require("fs");
const path = require("path");

class Movie {
  constructor(name, descrption, genre, year, imageUrl, date, actors) {
    this.name = name;
    this.descrption = descrption;
    this.genre = genre;
    this.year = year;
    this.imageUrl = imageUrl;
    this.date = date;
    this.actors = actors;
  }

  save() {
    const oldData = require(path.join(
      __dirname,
      "../",
      "/config/database.json"
    ));
    const data = {
      name: this.name,
      descrption: this.descrption,
      genre: this.genre,
      year: this.year,
      imageUrl: this.imageUrl,
      date: this.date,
      actors: this.actors,
    };

    const allData = [...oldData, data];

    fs.writeFile(
      path.join(__dirname, "../", "/config/database.json"),
      JSON.stringify(allData),
      (err) => {
        if (err) {
          throw err;
        }
        console.log("sucessfully added movie.");
      }
    );
  }
}

module.exports = Movie;
