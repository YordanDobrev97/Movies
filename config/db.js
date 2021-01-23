const connectionString = `mongodb://localhost:27017/filmi`;
const mongoose = require("mongoose");

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => console.log("Connection to database!"));

module.exports = mongoose;
