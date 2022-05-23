const onLeave = document.querySelector('.onLeave');
const modal = document.querySelector('.js-modal');
const btnClose = document.querySelector('.js-modal-close')
const modalContainer = document.querySelector('.js-modal-container')



function showModal() {
  modal.classList.add('openmodal')
}

function hideModal() {
  modal.classList.remove('openmodal')
}

btnClose.addEventListener('click', hideModal)
modal.addEventListener('click', hideModal)

modalContainer.addEventListener('click', function(event) {
  event.stopPropagation()

})

const typeOfLeave = document.querySelector('.typeOfLeave');
const dayLeave = document.querySelector('.js-dayLeave');
const hourLeave = document.querySelector('.js-hourLeave')

function showDayLeave() {
  dayLeave.classList.add('showDayLeave')
  hourLeave.classList.remove('showHourLeave')
}
function showHourLeave() {
  dayLeave.classList.remove('showDayLeave')
  hourLeave.classList.add('showHourLeave')

}
function hideDayAndHour() {
  hourLeave.classList.remove('showHourLeave')
  dayLeave.classList.remove('showDayLeave')

}

function handleSelect(obj) {
  var options = obj.children;
  for (var i = 0; i < options.length; i++){
    if (options[i].selected){
      if(options[i].value == 'day'){
        showDayLeave();
      }else if(options[i].value == 'hour'){
        showHourLeave();
      }
      else{
        hideDayAndHour();
      }
       
    }
}
  
}


var hourRange = document.getElementById("hourRange");
var outHour = document.getElementById("outHour");
outHour.innerHTML = hourRange.value; 
hourRange.oninput = function() {
  outHour.innerHTML = this.value;
}

function handleSelectMonth(obj) {
  var month = document.getElementById("month");
  var options = obj.children;
  for (var i = 0; i < options.length; i++){
    if (options[i].selected){
      month.value = options[i].value;
      console.log('month.value',month.value);
       
    }   
}
}