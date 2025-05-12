const { Schema, model } = require("mongoose");
const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = model("Note", noteSchema);
// Note.find({})
//   .then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   })
//   .catch((error) => {
//     console.log(error);
//   });

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

module.exports = Note;
