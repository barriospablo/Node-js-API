const supertest = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../index");
const Note = require("../models/Note");

const api = supertest(app);

const initialNotes = [
  {
    content: "Soy una nota",
    important: true,
    date: new Date(),
  },
  {
    content: "Soy otra nota",
    important: true,
    date: new Date(),
  },
];

beforeEach(async () => {
  await Note.deleteMany({});

  const note1 = new Note(initialNotes[0]);
  await note1.save();

  const note2 = new Note(initialNotes[1]);
  await note2.save();
});

test("get all notes", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-type", /application\/json/);
});

test("notes are returned as json", async () => {
  const response = await api.get("/api/notes");
  expect(response.body).toHaveLength(2);
});

test("the first note is about note", async () => {
  const response = await api.get("/api/notes");
  const contents = response.body.map((note) => note.content);
  expect(contents).toContain("Soy una nota");
});
test("a valid  note can be added", async () => {
  const newNote = {
    content: "Proximamente asynca/await",
    important: true,
  };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(200)
    .expect("Content-type", /application\/json/);

  const response = await api.get("/api/notes");
  const contents = response.body.map((note) => note.content);

  expect(response.body).toHaveLength(initialNotes.length + 1);
  expect(contents).toContain(newNote.content);
});
test("a note without content cant be added", async () => {
  const newNote = {
    important: true,
  };

  await api.post("/api/notes").send(newNote).expect(400);

  const response = await api.get("/api/notes");
  const contents = response.body.map((note) => note.content);

  expect(response.body).toHaveLength(initialNotes.length);
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
