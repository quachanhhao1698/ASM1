const Staff = require("../models/staff");
const methods = require("../utils/methods");


exports.getWorkTime = (req, res, next) => {
  Staff.findById(req.staff._id)
  .then((staff) => {
     let month = req.body.month;
    // console.log('getWorkTime_month : ',req.body);
      let salary = methods.addSalary(month,staff);
      res.render("staff/workTime", {
        pageTitle: "Danh sách làm việc",
        path: "/workTime",
        staff: staff,
        timeWorked: staff.timeWorked,
        salary:salary,
        month:month
      });
    })
    .catch((err) => {
      console.log(err);
    });
};