const { app } = require("../index");
const supertest = require("supertest");
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
const getAllCOntentFromNotes = async () => {
  const response = await api.get("/api/notes");
  // return response.body.map((note) => note.content);
  return {
    content: response.body.map((note) => note.content),
    response,
  };
};

module.exports = { initialNotes, api, getAllCOntentFromNotes };
