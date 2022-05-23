const moment = require("moment");

exports.totalTime = (startTime, endTime) => {
  const hStart = startTime.getHours() + 1;
  const mStart = startTime.getMinutes() + 1;

  const hEnd = endTime.getHours() + 1;
  const mEnd = endTime.getMinutes() + 1;

  const totalHour = Number(hEnd - hStart);

  const totalMinute = Number(mEnd - mStart) / 60;
  const totalTime = Math.floor(totalHour + totalMinute);

  return totalTime;
};

exports.totalDay = (startDay, endDay) => {
  const dStart = moment(startDay).date();
  const mStart = moment(startDay).month() + 1;
  const yStart = moment(startDay).year();

  const dEnd = moment(endDay).date();
  const mEnd = moment(endDay).month() + 1;
  const yEnd = moment(endDay).year();

  const totalDay = Number(dEnd - dStart);
  const totalMonth = Number(mEnd - mStart) * 30;
  const totalYear = Number(yEnd - yStart) * 365;

  const total = Math.floor(totalDay + totalMonth + totalYear);

  return total;
};

exports.totalWorkTime = (staff) => {
  let totalTimeWorked = 0;
  const workTimeInDay = [];
  const workTimesLength = staff.workTime.length;
  let startTime = staff.workTime[workTimesLength - 1].startTime;
  let day =
    startTime.getDate() +
    "/" +
    (startTime.getMonth() + 1) +
    "/" +
    startTime.getFullYear();

  //Tim danh sach thoi gian lam viec trong ngay
  staff.workTime.forEach((wt) => {
    const startTime =
      wt.startTime.getDate() +
      "/" +
      (wt.startTime.getMonth() + 1) +
      "/" +
      wt.startTime.getFullYear();
    if (day === startTime) {
      workTimeInDay.push(wt);
    }
    return workTimeInDay;
  });

  workTimeInDay.forEach((wt) => {
    // tinh so phut lam viec => doi ra gio
    if (wt.endTime == null || wt.startTime == null) {
      console.log("endTime == null");
      return totalTimeWorked;
    } else {
      const minutesStart =
        wt.startTime.getHours() + wt.startTime.getMinutes() / 60;
      const minutesEnd = wt.endTime.getHours() + wt.endTime.getMinutes() / 60;
      const total = minutesEnd - minutesStart;

      const hoursWorked = wt.endTime.getHours() - wt.startTime.getHours();
      return (totalTimeWorked = totalTimeWorked + hoursWorked + total);
    }
  });

  return { totalTimeWorked, workTimeInDay, day };
};

exports.addSalary = (month, staff) => {
  // let totalTime = 0;
  let overTime = 0;

  const monthWorked = staff.timeWorked.filter((tw) => {
    return tw.date.split("/")[1] == month;
  });
  console.log("monthWorked", monthWorked);
  for (wt of monthWorked) {
    // totalTime += wt.totalTime;
    overTime += wt.overTime;
  }

  return staff.staffInfo.salaryScale * 3000000 + overTime * 200000;
};
