const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const Staff = require("./models/staff");
const moment = require('moment');

const mongoose = require("mongoose");
const port = "3000";

const errorController = require('./controllers/error');
const userRoutes = require("./routes/staff");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  Staff.findById("6287328bcf97141464ed53e4")
    .then((staff) => {
      req.staff = staff;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(userRoutes);
app.use(errorController.get404);


mongoose
  .connect(
    "mongodb+srv://quachanhhao:01245312z@cluster0.zs7t6.mongodb.net/staffs_manager?retryWrites=true&w=majority"
  )
  .then((result) => {
    Staff.findOne().then((staff) => {
      if (!staff) {
        const staff = new Staff({
          status: false,
          workTimes: [],
          staffInfo: {
            name: "Quach Anh Hao",
            doB: '06/01/1998',
            salaryScale: 1,
            startDate: "05/08/2022",
            department: "IT",
            annualLeave: 10,
            image:
              "https://icon-library.com/images/avatar-png-icon/avatar-png-icon-13.jpg",
          },
        });

        staff.save();
      }
    });
    console.log("connected");
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
