const left = document.querySelector('.js-left');
const center = document.querySelector('.js-center');
const right = document.querySelector('.js-right');

function leaveClickHandler() {
  left.classList.add('showLeft');
  center.classList.remove('showCenter');
  right.classList.add('hideRight');
}
function workTimeClickHandler() {
  left.classList.remove('showLeft');
  center.classList.add('showCenter');
  right.classList.add('hideRight');
}
function salaryClickHandler() {
  left.classList.remove('showLeft');
  center.classList.remove('showCenter');
  right.classList.remove('hideRight');
}

