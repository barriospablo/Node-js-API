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
  {
    content: "Loremmmn ipsum",
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

test(" the first note is about note", async () => {
  const response = await api.get("/api/notes");
  const contents = response.body.map((note) => note.content);
  expect(contents).toContain("Soy una nota");
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
