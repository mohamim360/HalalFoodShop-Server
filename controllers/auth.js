const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// This function handles user login
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let loadedUser;

  // Find a user in the database by email
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User with this email cannot be found" });
      }
      loadedUser = user;

      // Compare the provided password with the hashed password in the database
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        return res.status(400).json({ message: "Invalid email or password." });
      }

      // Generate a JSON Web Token (JWT) for the authenticated user
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
          userRole: loadedUser.role,
        },
        process.env.JWT_SECRET, // Secret key for JWT
        { expiresIn: "1h" } // Token expiration time
      );

      // Send a response with the JWT and user ID
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        message: "Login successful"
      });
    });
};

// This function handles user registration (sign-up)
exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // Check if a user with the same email already exists
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the user's password before storing it in the database
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name: name,
          email: email,
          role: "User", // Default role for a new user
          password: hashedPassword,
          cart: { items: [] }, // Initialize an empty cart for the user
        });
        return user.save();
      });
    })
    .then((result) => {
      // Send a response indicating successful user creation
      res.status(201).json({ message: "User created!", userId: result._id });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    });
};
