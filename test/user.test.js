const bcrypt = require("bcrypt");
const User = require("../models/User");
const { api, getUsers } = require("./helpers");

describe.only("create user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("pswd", 10);
    const user = new User({ username: "PablinhoTests", passwordHash });

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
});
