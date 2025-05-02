const mongoose = require("mongoose");
const password = require("./password.js");

const uri = process.env.MONGO_DB_URI;

//conexion a mongodb
mongoose
  .connect(uri)
  .then(() => {
    console.log("DataBase connected");
  })
  .catch((error) => {
    console.log(error);
  });
