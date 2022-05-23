const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const methods = require("../utils/methods");
const moment = require("moment");

const staffSchema = new Schema({
  status: { type: Boolean, required: true },
  workTime: [
    {
      workPlace: { type: String },
      startTime: { type: Date },
      endTime: { type: Date },
      totalTime: { type: Number },
    },
  ],
  leave: [
    {
      startDay: { type: Date },
      endDay: { type: Date },
      totalDay: { type: Number },
      reason: { type: String },
    },
  ],
  staffInfo: {
    name: { type: String, required: true },
    doB: { type: Date, required: true },
    salaryScale: { type: Number, required: true },
    startDate: { type: Date, required: true },
    department: { type: String, required: true },
    annualLeave: { type: Number, required: true },
    image: { type: String, required: true },
  },
  timeWorked: [
    {
      date: { type: String },
      workTimes: [],
      totalTime: { type: Number },
      overTime: { type: Number },
    },
  ],
});

//Bat dau diem danh
staffSchema.methods.addStartTime = function (workPlace) {
  this.status = true;
  if (this.workTime.length < 0) {
    const newTime = {
      workPlace: workPlace,
      startTime: new Date(),
      endTime: null,
      totalTime: 0,
    };
    this.workTime = newTime;
    return this.save();
  } else {
    const newTime = {
      workPlace: workPlace,
      startTime: new Date(),
      endTime: null,
      totalTime: 0,
    };
    const updateWorkTime = [...this.workTime];
    updateWorkTime.push(newTime);
    this.workTime = updateWorkTime;
    return this.save();
  }
};

//Ket thuc diem danh
staffSchema.methods.addEndTime = function () {
  this.status = false;
  const lastWorkTime = this.workTime[this.workTime.length - 1];
  if (lastWorkTime.endTime === null) {
    lastWorkTime.endTime = new Date();
    lastWorkTime.totalTime = methods.totalTime(
      lastWorkTime.startTime,
      lastWorkTime.endTime
    );
    return this.save();
  } else {
    return this.save();
  }
};

//Them thong tin ngay nghi
staffSchema.methods.addAnnualLeave = function (
  leaveInfoByDay,
  leaveInfoByHour
) {
  if (leaveInfoByHour.startDay === "") {
    const newLeave = {
      startDay: leaveInfoByDay.startDay,
      endDay: leaveInfoByDay.endDay,
      totalDay: methods.totalDay(
        leaveInfoByDay.startDay,
        leaveInfoByDay.endDay
      ),
      reason: leaveInfoByDay.reason,
    };
    this.staffInfo.annualLeave = this.staffInfo.annualLeave - newLeave.totalDay;
    const updateLeave = [...this.leave];
    updateLeave.push(newLeave);
    this.leave = updateLeave;
    this.save();
  } else {
    const newLeave = {
      startDay: leaveInfoByHour.startDay,
      endDay: leaveInfoByHour.endDay,
      totalDay: leaveInfoByHour.totalDay,
      reason: leaveInfoByHour.reason,
    };
    this.staffInfo.annualLeave = this.staffInfo.annualLeave - newLeave.totalDay;
    const updateLeave = [...this.leave];
    updateLeave.push(newLeave);
    this.leave = updateLeave;
    this.save();
  }
};

staffSchema.methods.addTimeWorked = function () {
  const workedInDay = methods.totalWorkTime(this);
  let overTime = workedInDay.totalTimeWorked % 8;
  let totalTime = workedInDay.totalTimeWorked - overTime;
  const newTimeWorked = {
    date: workedInDay.day,
    workTimes: workedInDay.workTimeInDay,
    totalTime:totalTime,
    overTime: overTime,
  };
  if (this.timeWorked.length <= 0) {
    console.log("ok 1");
    this.timeWorked = newTimeWorked;
    return this.save();
  } else {
    const updatedTimeWorked = [...this.timeWorked];
    // console.log(updatedTimeWorked);
    let len = this.timeWorked.length;
    // Kiem tra phan tu cuoi mang
    if (updatedTimeWorked[len - 1].date == workedInDay.day) {
      //cap nhat mang workTimes
      updatedTimeWorked[len - 1].workTimes.push(
        workedInDay.workTimeInDay[workedInDay.workTimeInDay.length - 1]
      );
      updatedTimeWorked[len - 1].totalTime = totalTime;
      updatedTimeWorked[len - 1].overTime = overTime;

      this.timeWorked = updatedTimeWorked;
      return this.save();
    } else {
      //cap nhat doi tuong moi vao mang
      updatedTimeWorked.push(newTimeWorked);
      this.timeWorked = updatedTimeWorked;
      return this.save();
    }
  }
};

// staffSchema.methods.addSalary = function (month) {
//   // let totalTime = 0;
//   let overTime =0;
//   //tong gio lam trong thang
//   const monthWorked = this.timeWorked.filter((tw) => {
//     return tw.date.split("/")[1] ==month;
//   });
//   console.log("monthWorked", monthWorked);
//   for (wt of monthWorked) {
//     // totalTime += wt.totalTime;
//     overTime += wt.overTime;
//   }
  
//   return this.staffInfo.salaryScale * 3000000 + (overTime)*200000;
// };

module.exports = mongoose.model("Staff", staffSchema);
