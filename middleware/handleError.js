const ERROR_HANDLERS = {
  CastError: (res) => res.status(400).send({ error: "id user is malformed" }),

  ValidationError: (res, error) =>
    res.status(409).send({
      error: error.message,
    }),

  TypeError: (res) =>
    res.status(401).json({ error: "token missing or invalid" }),

  defaultError: (res) => res.status(500).end(),
};
module.exports = (err, req, res, next) => {
  console.error(err.name);
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError;
  handler(res, err);
};
