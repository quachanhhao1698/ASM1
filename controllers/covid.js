const Staff = require("../models/staff");

exports.getCovid = (req, res, next) => {
  Staff.findById(req.staff._id).then(staff=>{

    res.render("staff/covid", {
      pageTitle: "Thông tin covid",
      path: "/covid",
      bodyTemperature:staff.bodyTemperature,
      vaccineInfo:staff.vaccineInfo,
      infectCovidInfo:staff.infectCovidInfo
    });
  }).catch()
};

exports.postBodyTemperature = (req, res, next) => {
  Staff.findById(req.staff._id)
    .then((staff) => {
      const date = req.body.date_temperature;
      const temperature = req.body.temperature;
      const time = req.body.time_temperature;
      console.log("date", date);
      console.log("time", time);
      console.log("temperature", temperature);
      const info ={
        date:date,
        time:time,
        temperature:temperature,
      }
      staff.addBodyTemperature(info);
      res.redirect("/covid");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postVaccineInfo = (req,res)=>{
  Staff.findById(req.staff._id)
    .then((staff) => {
      const date1 = req.body.date_vaccineInfo1;
      const name1 = req.body.name_vaccineInfo1;
      const date2 = req.body.date_vaccineInfo2;
      const name2 = req.body.name_vaccineInfo2;
      const dose1 ={
        date:date1,
        nameVaccine:name1,
      }
      const dose2 ={
        date:date2,
        nameVaccine:name2,
      }
      staff.addVaccineInfo(dose1,dose2);
      res.redirect("/covid");
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.postInfectCovidInfo = (req,res)=>{
  Staff.findById(req.staff._id)
  .then((staff) => {
    const datePositive = req.body.datePositive;
    const dateRecover = req.body.dateRecover;
    
    const infectCovidInfo ={
      datePositive:datePositive,
      dateRecover:dateRecover,
    }
    staff.addInfectCovidInfo(infectCovidInfo);
    res.redirect("/covid");
  })
  .catch((err) => {
    console.log(err);
  });
}
