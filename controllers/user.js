const User = require("../models/user");

// This function is for getting a list of all users
exports.getUsers = (req, res, next) => {
  User.find().then((users) => {
    res.status(200).json({
      users: users,
    });
  });
};

// This function is for getting details of a specific user by their ID
exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId).then((user) => {
    res.status(200).json({
      user: user,
    });
  });
};

// This function is for updating the role of a user
exports.updateUserRole = (req, res, next) => {
  const userId = req.params.userId;
  const { role } = req.body;
  console.log(userId, role);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.role = role;
      return user.save();
    })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        user: updatedUser,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error" });
    });
};

// This function is for deleting a user by their ID
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByIdAndRemove(userId).then((deletedUser) => {
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  });
};
