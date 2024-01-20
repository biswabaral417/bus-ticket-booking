const mongoose = require("mongoose");

const mongoURI = process.env.DB;
console.log(mongoURI);
console.log(process.env.SECRET_KEY);
console.log(process.env.PORT);

mongoose.connect(mongoURI);
//data for foods database)

//check connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database!");
});
