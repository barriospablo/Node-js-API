const { suma } = require("../utils/index");

test.skip("Suma test", () => {
  const result = suma(2, 3);
  expect(result).toBe(5);
});
