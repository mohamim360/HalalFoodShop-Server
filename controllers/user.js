const user = require("../models/user");
const User = require("../models/user");

exports.getUsers = (req, res, next) => {
  User.find().then((users) => {
    res.status(200).json({
      users: users,
    });
  });
};

exports.getUser = (req, res, next) => {
	const userId = req.params.userId;
  User.findById(userId).then((user) => {
    res.status(200).json({
      user: user,
    });
  });
};

exports.updateUserRole = (req, res, next) => {
  const userId = req.params.userId;
  const { role } = req.body;
	console.log(userId,role);
  User
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

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId; 
  User.findByIdAndRemove(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
 
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    })

};