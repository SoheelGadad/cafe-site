require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const User = require("./models/userModel");
const generateToken = require("./utils/generateToken");
var { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { protect } = require("./middleware/authmiddleware");

const sendEmail = require("./utils/sendEmail");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var asyncHandler = require("express-async-handler");

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

// Routes
app.use("/availability", require("./routes/availabilityRoute"));
app.use("/reserve", require("./routes/reservationRoute"));

//login---------------------------------------------

//@description     Register new user
//@access          Public
app.post(
  "/api/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        uAddress: user.uAddress,
        PhoneNo: user.PhoneNo,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);
//@description     Register new user
//@access          Public
app.post(
  "/api/register",
  asyncHandler(async (req, res) => {
    const { name, email, password, pic, uAddress, PhoneNo } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(404);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      uAddress,
      PhoneNo,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        uAddress: user.uAddress,
        PhoneNo: user.PhoneNo,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  })
);

// @desc    GET user profile
// @access  Private

app.post("/api/profile", protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.uAddress = req.body.uAddress || user.uAddress;
    user.PhoneNo = req.body.PhoneNo || user.PhoneNo;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      uAddress: updatedUser.uAddress,
      PhoneNo: updatedUser.PhoneNo,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
app.delete(
  "/api/delectUser",
  asyncHandler(async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user._id);
      res.json({ message: "user Delected successfully" });
    } catch (error) {
      res.status(404);
      throw new Error("Error while deleting user");
    }
  })
);
app.get(
  "/api/get-password",
  asyncHandler(async (req, res) => {
    const { password } = req.body;
    const user = await User.findById(req.user._id);

    if (user && (await user.matchPassword(password))) {
      res.json({});
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

app.post("/api/forget-password", async (req, res) => {
  const { email } = req.body;
  try {
    const olduser = await User.findOne({ email });
    if (!olduser) {
      return res
        .status(409)
        .send({ message: "User with given email does not exist!" });
    }
    const secret = process.env.JWT_SECRET + olduser.password;
    const token = jwt.sign({ email: olduser.email, id: olduser._id }, secret, {
      expiresIn: "10m",
    });
    const url = `${process.env.REACT_APP_BASE_URI}/reset-password/${olduser.id}/${token}`;
    await sendEmail(olduser.email, "Password Reset", url);
    //console.log(url);
    res
      .status(200)
      .send({ message: "Password reset link sent to your email account" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const olduser = await User.findOne({ _id: id });
  if (!olduser) {
    return res.status(400).send({ message: "Invalid link" });
  }
  const secret = process.env.JWT_SECRET + olduser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.status(200).send("Valid Url");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const olduser = await User.findOne({ _id: id });
  if (!olduser) {
    return res.status(400).send({ message: "Invalid link" });
  }
  const secret = process.env.JWT_SECRET + olduser.password;
  try {
    const verify = jwt.verify(token, secret);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    olduser.password = hashPassword;
    await User.updateOne({ _id: id }, { password: hashPassword });

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//--------------------------------------------------------
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  //*Set static folder up in production
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/"),
    (req, res) => {
      res.send("API is running..");
    };
}
app.use(notFound);
app.use(errorHandler);
//----------------------------------------------------------
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", (_) => {
  console.log("Connected to DB");
});

module.exports = app;
