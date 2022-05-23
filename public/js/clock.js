function clock() {
  let date = document.getElementById("date");
  let hour = document.getElementById("hour");
  let minute = document.getElementById("minute");
  let second = document.getElementById("second");

  let day = new Date().getDate();
  let month = (new Date().getMonth())+1;
  let year = new Date().getFullYear();

  let nowDate = day + '/' + month + '/' + year;
  let nowHour = new Date().getHours();
  let nowMinute = new Date().getMinutes();
  let nowSecond = new Date().getSeconds();
  // console.log(nowDate);

  date.innerHTML = nowDate
  hour.innerHTML = nowHour;
  minute.innerHTML = nowMinute;
  second.innerHTML = nowSecond;
}
let realTime = setInterval(clock, 1000);
