const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = "";

  const authorization = req.get("authorization");

  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  let decodedToken = {};

  decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return res.status.apply(401).json({ error: "token missing or invalid" });
  }

  const { id: userId } = decodedToken;

  req.userId = userId;

  next();
};
