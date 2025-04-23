const express = require("express");
const app = express();
//parsea lo que se manda en la request para tenerlo en el body
app.use(express.json());

let notes = [
  { id: 1, content: "Soy el content", date: "2020", important: true },
  { id: 2, content: "Soy segundo content", date: "2021", important: false },
  { id: 3, content: "Soy tercer content", date: "2022", important: false },
];

//Con HTTP
// const app = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify(notes));
// });

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const note = notes.find((n) => n.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  if (!note || !note.content) {
    return res.status(400).json({
      error: "note.content is missing",
    });
  }
  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== "undefined" ? note.important : false,
    date: new Date().toISOString(),
  };
  notes = [...notes, newNote];

  res.status(201).json(newNote);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
