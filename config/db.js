const connectionString = `mongodb+srv://admin:123qweasdzxc98830@cluster0.zbkcm.mongodb.net/filmiibm?retryWrites=true&w=majority`;
const mongoose = require("mongoose");

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => console.log("Connected to database!"));

module.exports = mongoose;
