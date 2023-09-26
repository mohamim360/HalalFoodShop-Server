const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];

  let decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = decodedToken.userId;
  req.userRole = decodedToken.userRole;
  next();
};
