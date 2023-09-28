const User = require("../models/user");

module.exports = (req, res, next) => {
  if (!req.userId) {
    return next();
  }
  User.findById(req.userId)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
};
