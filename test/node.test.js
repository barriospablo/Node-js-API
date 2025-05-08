const supertest = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../index");

const api = supertest(app);

test("notes are returned as json", async () => {
  const response = await api.get("/api/notes");

  expect(response.body).toHaveLength(1);
  // .expect("Content-type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
