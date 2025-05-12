const mongoose = require("mongoose");
const { server } = require("../index");
const Note = require("../models/Note");
const { initialNotes, api, getAllCOntentFromNotes } = require("./helpers");

beforeEach(async () => {
  await Note.deleteMany({});

  for (const note of initialNotes) {
    const noteObject = new Note(note);
    await noteObject.save();
  }
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
  const { content } = await getAllCOntentFromNotes();
  expect(content).toContain("Soy una nota");
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
test("a note can be delelted", async () => {
  const { response } = await getAllCOntentFromNotes();
  const { body: notes } = response;
  const noteToDelete = notes[0];

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

  const { content, response: secondResponse } = await getAllCOntentFromNotes();
  expect(secondResponse.body).toHaveLength(initialNotes.length - 1);
  expect(content).not.toContain(noteToDelete.content);
});

test("a that not exist cant be deleted", async () => {
  await api.delete(`/api/notes/1234`).expect(400);

  const { response } = await getAllCOntentFromNotes();
  expect(response.body).toHaveLength(initialNotes.length);
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
