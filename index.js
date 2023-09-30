const express = require("express");

const bodyParser = require("body-parser");

const path = require("path");

const mongoose = require("mongoose");

require("dotenv").config();

const cors = require("cors");

const flash = require("connect-flash");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(flash());

app.use("/auth", authRoutes);
app.use("/admin/user", userRoutes);
app.use("/admin/product", adminRoutes);
app.use("/shop", shopRoutes);

mongoose
  .connect(process.env.DB_URI)
  .then((result) => {
    console.log("connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
