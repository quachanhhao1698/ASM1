const Staff = require("../models/staff");
const methods = require("../utils/methods");

exports.getWorkTime = (req, res, next) => {
  Staff.findById(req.staff._id)
    .then((staff) => {
      let month = req.body.month;
      console.log(month);
      const salary = methods.addSalary(req.body.month,staff)
      res.render("staff/workTime", {
        pageTitle: "Danh sách làm việc",
        path: "/workTime",
        staff: staff,
        timeWorked: staff.timeWorked,
        salary
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.postAddSalary = (req, res, next) => {
//   Staff.findById(req.staff._id).then((staff) => {
//     let month = req.body.month;
//     console.log('month',month);
//     return staff.addSalary(month);
//   }).then(()=>{
//     res.redirect("/workTime")
//   });
// };

// exports.getSalary = (req, res, next) => {
//   Staff.findById(req.staff._id).then(staff=>{
//     staff.addSalary()
//   })
// };
