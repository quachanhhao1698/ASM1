//Modal thông tin thân nhiệt
const modal__temperature = document.querySelector(".js-modal__temperature");
const modal__temperatureClose = document.querySelector(
  ".js-modal__temperature-close"
);
const modal__temperatureContainer = document.querySelector(
  ".js-modal__temperature-container"
);

function showModal__temperature() {
  modal__temperature.classList.add("openmodal__temperature");
}
function hideModal__temperature() {
  modal__temperature.classList.remove("openmodal__temperature");
}
modal__temperatureClose.addEventListener("click", hideModal__temperature);
modal__temperature.addEventListener("click", hideModal__temperature);
modal__temperatureContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});

//Modal thông tin tiêm vaccine
const modal__vaccineInfo = document.querySelector(".js-modal__vaccineInfo");
const modal__vaccineInfoClose = document.querySelector(
  ".js-modal__vaccineInfo-close"
);
const modal__vaccineInfoContainer = document.querySelector(
  ".js-modal__vaccineInfo-container"
);

function showModal__vaccineInfo() {
  modal__vaccineInfo.classList.add("openmodal__vaccineInfo");
}
function hideModal__vaccineInfo() {
  modal__vaccineInfo.classList.remove("openmodal__vaccineInfo");
}
modal__vaccineInfoClose.addEventListener("click", hideModal__vaccineInfo);
modal__vaccineInfo.addEventListener("click", hideModal__vaccineInfo);
modal__vaccineInfoContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});

//Modal thông tin nhiễm covid
const modal__infectCovidInfo = document.querySelector(".js-modal__infectCovidInfo");
const modal__infectCovidInfoClose = document.querySelector(
  ".js-modal__infectCovidInfo-close"
);
const modal__infectCovidInfoContainer = document.querySelector(
  ".js-modal__infectCovidInfo-container"
);

function showModal__infectCovidInfo() {
  modal__infectCovidInfo.classList.add("openmodal__infectCovidInfo");
}
function hideModal__infectCovidInfo() {
  modal__infectCovidInfo.classList.remove("openmodal__infectCovidInfo");
}
modal__infectCovidInfoClose.addEventListener("click", hideModal__infectCovidInfo);
modal__infectCovidInfo.addEventListener("click", hideModal__infectCovidInfo);
modal__infectCovidInfoContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});