module.exports = (req, res, next) => {
  if (req.userRole === "Admin") {
    next();
  }
};
