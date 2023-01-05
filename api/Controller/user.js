const User = require("../models/userModel");

const nodemailer = require("nodemailer");

 const sendotp = async (req, res) => {
  console.log(req.body);
  const _otp = Math.floor(100000 + Math.random() * 900000);
  console.log(_otp);
  let user = await User.findOne({ email: req.body.email });
  // send to user mail
  if (!user) {
    res.send({ code: 500, message: "user not found" });
  }

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    service:`gmail`,
    host:`smtp.gmail.com`,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let info = await transporter.sendMail({
    from: "soheelgadad16@gmail.com",
    to: req.body.email, // list of receivers
    subject: "OTP", // Subject line
    text: String(_otp),
    html: `<html>
              < body >
              Hello and welcome
          </ >
         </html > `,
  });

  if (info.messageId) {
    console.log(info, 84);
    User.updateOne({ email: req.body.email }, { otp: _otp })
      .then((result) => {
        res.send({ code: 200, message: "otp send" });
      })
      .catch((err) => {
        res.send({ code: 500, message: "Server err" });
      });
  } else {
    res.send({ code: 500, message: "Server err" });
  }
};

const submitotp = (req, res) => {
  console.log(req.body);

  User.findOne({ otp: req.body.otp })
    .then((result) => {
      //  update the password

      User.updateOne({ email: result.email }, { password: req.body.password })
        .then((result) => {
          res.send({ code: 200, message: "Password updated" });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch((err) => {
      res.send({ code: 500, message: "otp is wrong" });
    });
};
module.exports = {sendotp,submitotp};