const mongoose = require("mongoose");
const password = require("./password.js");

const { MONGO_DB_URI_TEST, MONGO_DB_URI, NODE_ENV } = process.env;
const connectionString = NODE_ENV === "test" ? MONGO_DB_URI_TEST : MONGO_DB_URI;

//conexion a mongodb
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("DataBase connected");
  })
  .catch((error) => {
    console.log(error);
  });

process.on("uncaughtException", (error) => {
  console.error(error);
  mongoose.disconnect();
});
