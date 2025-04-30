const mongoose = require("mongoose");
const password = require("./password.js");

const uri = `mongodb+srv://Pablinho:${password}@fullstack.ptapihp.mongodb.net/mongoDB?retryWrites=true&w=majority&appName=FullStack`;

//conexion a mongodb
mongoose
  .connect(uri)
  .then(() => {
    console.log("DataBase connected");
  })
  .catch((error) => {
    console.log(error);
  });
