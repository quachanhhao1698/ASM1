const Staff = require("../models/staff");
const moment = require("moment");
const methods = require("../utils/methods");

exports.getIndex = (req, res, next) => {
  res.render("index", {
    pageTitle: "Trang chủ",
    path: "/",
  });
};

exports.getAttendance = (req, res, next) => {
  Staff.findById(req.staff._id).then((staff) => {
    const day = new Date();
    const today =
      day.getDate() + "/" + (day.getMonth() + 1) + "/" + day.getFullYear();
    // Hien thi thoi gian diem danh cua ngay hien tai
    staff.workTime = staff.workTime.filter((wt) => {
      const workDay =
        wt.startTime.getDate() +
        "/" +
        (wt.startTime.getMonth() + 1) +
        "/" +
        wt.startTime.getFullYear();
      return workDay === today;
    });
    res.render("staff/attendance", {
      pageTitle: "Điểm danh",
      path: "/attendance",
      staff: staff,
    });
  });
};

exports.postAttendance = (req, res, next) => {
  const workPlace = req.body.workPlace;
  console.log(workPlace);
  Staff.findById(req.staff._id)
  .then((staff) => {
      return staff.addStartTime(workPlace);
    })
    .then(() => {
      res.redirect("/attendance");
    })

    .catch((err) => {
      console.log(err);
    });
};

exports.postEndAttendance = (req, res, next) => {
  Staff.findById(req.staff._id)
    .then((staff) => {
      return staff.addEndTime();
    })
    .then((staff) => {
      res.redirect("/attendance");
      return staff.addTimeWorked();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddAnnualLeave = (req, res, next) => {
  const startDay = req.body.startDay;
  const endDay = req.body.endDay;
  const reason = req.body.reason;
  const leaveInfoByDay = {
    startDay: startDay,
    endDay: endDay,
    totalDay: 0,
    reason: reason,
  };
  const day = req.body.day;
  console.log(typeof day);
  const time = Number(req.body.hour) / 8;
  const leaveInfoByHour = {
    startDay: day,
    endDay: day,
    totalDay: time,
    reason: reason,
  };
  Staff.findById(req.staff._id)
    .then((staff) => {
      return staff.addAnnualLeave(leaveInfoByDay, leaveInfoByHour);
    })
    .then(() => {
      res.redirect("/attendance");
    });
};

exports.getProfile = (req, res, next) => {
  Staff.findById(req.staff._id).then((staff) => {
    res.render("staff/profile", {
      pageTitle: "Thông tin nhân viên",
      path: "/profile",
      staff: staff,
    });
  });
};

exports.postProfile = (req, res, next) => {
  const updateImage = req.body.staffImage;
  Staff.findById(req.staff._id)
    .then((staff) => {
      staff.staffInfo.image = updateImage;
      return staff.save();
    })
    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => console.log(err));
};
