const User = require("../models/user");

const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken');

exports.postLogin = (req, res, next) => {
	const email = req.body.email;
  const password = req.body.password;

	let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: "user with this email can not be found" });
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        return res.status(400).json({ message: "Invalid email or password." });
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
}

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.status(400).json({ message: "user already exit" });
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name: name,
          email: email,
          password: hashedPassword,
          cart: { items: [] },
        });
        return user.save();
      });
    })
    .then((result) => {
      res.status(201).json({ message: "User created!", userId: result._id });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    });
};
