const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: Number, required: true },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
    },
  },
  {
    timestamps: true,
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);
module.exports = model;
