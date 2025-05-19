require("dotenv").config();
require("./mongo");
require("./instrument.js");

const Sentry = require("@sentry/node");
const express = require("express");
const logger = require("./loggerMiddleware");
const app = express();
const cors = require("cors");
const Note = require("./models/Note");
const notFound = require("./middleware/notFound");
const handleError = require("./middleware/handleError");
const userRouter = require("./controllers/users");
const User = require("./models/User.js");

app.use(express.json()); //parsea lo que se manda en la request para tenerlo en el body
app.use(cors());
app.use(logger);
app.use(express.static("images")); //servir contenido estatico de una carpeta

// let notes = [
//   // { id: 1, content: "Soy el content", date: "2020", important: true },
//   // { id: 2, content: "Soy segundo content", date: "2021", important: false },
//   // { id: 3, content: "Soy tercer content", date: "2022", important: false },
// ];

//Con HTTP
// const app = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify(notes));
// });

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/notes", async (req, res) => {
  //with promises
  // Note.find({}).then((notes) => {
  //   res.json(notes);
  // });

  //with await
  const notes = await Note.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(notes);
});

app.get("/api/notes/:id", (req, res, next) => {
  const { id } = req.params;

  Note.findById(id)
    .then((note) => {
      if (note) {
        return res.json(note);
      } else {
        return res.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});
app.delete("/api/notes/:id", (req, res, next) => {
  const { id } = req.params;
  Note.findByIdAndDelete(id)
    .then((note) => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

app.post("/api/notes", async (req, res) => {
  const { content, important = false, userId } = req.body;

  const user = await User.findById(userId);

  if (!content) {
    return res.status(400).json({
      error: "note.content is missing",
    });
  }
  const newNote = new Note({
    content,
    date: new Date().toISOString(),
    important,
    user: user._id,
  });

  // newNote.save().then((savedNote) => {
  //   res.json(savedNote);
  // });
  try {
    const savedNote = await newNote.save();

    user.notes = user.notes.concat(savedNote._id);
    await user.save();

    res.json(savedNote);
  } catch (error) {
    next(error);
  }
});
app.put("/api/notes/:id", (req, res, next) => {
  const { id } = req.params;
  const note = req.body;
  const newNoteInfo = {
    content: note.content,
    important: note.important,
  };
  //sin el new: true el findByIdAndUpdate nos devuelve el valor que encuentra con el id
  //con el new : true el findByIdAndUpdate nos devuelve el valor del nuevo objeto
  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then((result) => {
    res.json(result);
  });
});

Sentry.setupExpressErrorHandler(app);
app.use("/api/users", userRouter);
app.use(notFound);

app.use(handleError);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
