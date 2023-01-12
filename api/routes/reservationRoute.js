var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const sendEmail = require("../utils/sendEmail");
const Day = require("../models/day").model;
const Reservation = require("../models/reservation").model;
///const available = require("../models/table").model;
// Parameters:
// {
//   "date": String ("Dec 02 2019 06:00"),
//   "table": table id,
// 	"name": String,
// 	"phone": String,
// 	"email": String
// }

router.post("/", function async(req, res, next) {
  Day.find({ date: req.body.date }, (err, days) => {
    if (!err) {
      if (days.length > 0) {
        let day = days[0];
        day.tables.forEach((table) => {
          if (table._id == req.body.table) {
            // The correct table is table
            table.reservation = new Reservation({
              name: req.body.name,
              phone: req.body.phone,
              email: req.body.email,
              ExitTime: req.body.exittime,
            });
            table.isAvailable = false;
            day.save((err) => {
              if (err) {
                console.log(err);
              } else {
                const url = `Thank you ${req.body.name} Your table ID: ${table._id} and you given number ${req.body.phone} you Exit time:${req.body.exittime}
                 Plz Don't share Your table ID to other`;
                //console.log(url);
                sendEmail(req.body.email, "Reservation table", url);
                res.status(200).send("Added Reservation");
              }
            });
          }
        });
      } else {
        console.log("Day not found");
      }
    }
  });
});

module.exports = router;
