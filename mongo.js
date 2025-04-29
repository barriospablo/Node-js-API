const mongoose = require("mongoose");
const password = require("./password.js");
const { model, Schema } = mongoose;

const uri = `mongodb+srv://Pablinho:${password}@fullstack.ptapihp.mongodb.net/?retryWrites=true&w=majority&appName=FullStack`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("DataBase connected");
  })
  .catch((error) => {
    console.log(error);
  });

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = model("Note", noteSchema);
Note.find({})
  .then((result) => {
    console.log(result);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log(error);
  });

// const note = new Note({
//   content: "MongoBD note from api",
//   date: new Date(),
//   important: true,
// });

// note
//   .save()
//   .then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   })
//   .catch((error) => {
//     console.log(error);
//   });
