module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(400).send({ error: "bad id" });
  if (err.name === "CasteError") {
    res.status(400).end();
  } else {
    res.status(500).end();
  }
};
