const bcrypt = require("bcrypt");
const User = require("../models/User");
const { api, getUsers } = require("./helpers");

describe.only("create user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("pswd", 10);
    const user = new User({
      username: "PablinhoTests",
      name: "Pablo",
      passwordHash,
    });

    await user.save();
  });
  test("works as expected creating a username", async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: "pablinho test",
      name: "test",
      password: "1234",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  });
  test("creation fails with proper status code", async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: "PablinhoTests",
      name: "user",
      password: "userpass",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error.errors.username.message).toContain(
      "`username` to be unique."
    );
    const usersAtEnd = await getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});
