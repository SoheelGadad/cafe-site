require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const User = require("./models/userModel");
const generateToken = require("./utils/generateToken");
var { errorHandler } = require("./middleware/errorMiddleware");
const { protect } = require("./middleware/authMiddleware.js");
//const userController = require("./Controller/user");
const sendEmail = require("./utils/sendEmail");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
// MongoDB
const mongoose = require("mongoose");
const { Verify } = require("crypto");
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;

// Express
var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("views", "./views");
app.set("view engine", "ejs");
//app.use(notFound);
app.use(errorHandler);
// Routes
app.use("/availability", require("./routes/availabilityRoute"));
app.use("/reserve", require("./routes/reservationRoute"));

//app.use("/send-otp", userController.sendotp);
//app.use("/submit-otp", userController.submitotp);

//login---------------------------------------------

//@description     Register new user
//@access          Public
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@access          Public
app.post("/api/register", async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    GET user profile
// @access  Private

app.post("/api/profile", protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,

      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
app.post("/api/forget-password", async (req, res) => {
  const { email } = req.body;
  try {
    const olduser = await User.findOne({ email });
    if (!olduser) {
      res.status(401);
      throw new Error("Invalid Email");
    }
    const secret = process.env.JWT_SECRET + olduser.password;
    const token = jwt.sign({ email: olduser.email, id: olduser._id }, secret, {
      expiresIn: "10m",
    });
    const link = `http://localhost:3000/reset-password/${olduser.id}/${token}`;
    await sendEmail(olduser.email, "Password Reset", link);

    console.log(link);
  } catch (error) {
    console.log(error);
  }
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { token } = req.params;
  const { id } = req.params;
  db.select("*")
    .from("user")
    .where({ id })
    .then((user) => {
      res.json(user[0]);
    });
  console.log(req.params);
  const olduser = await User.findOne({ _id: id });
  if (!olduser) {
    return res.status(401).send({ message: "Invalid user" });
  }
  const secret = process.env.JWT_SECRET + olduser.password;
  try {
    const verify = jwt.verify(token, secret);
  } catch (error) {
    console.log(error);
    res.send("not Verify");
  }
});
app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params.streamId;
  const password = req.body;
  const olduser = await User.findOne({ _id: id });
  if (!olduser) {
    return res.status(400).send({ message: "Invalid link" });
  }
  const secret = process.env.JWT_SECRET + olduser.password;
  try {
    const verify = jwt.verify(token, secret);
    const hashPassword = await bcrypt.hash(password);
    await User.updateOne(
      {
        id: id,
      },
      {
        password: hashPassword,
      }
    );
    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
//----------------------------------------------------------
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", (_) => {
  console.log("Connected to DB");
});

module.exports = app;
