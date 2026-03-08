// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



const startBtn = document.querySelector(`button`);
const timer = document.querySelector(`.timer`);

let intervalId;
let userSelectedDate;

startBtn.disabled = true;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const now = Date.now();
    userSelectedDate = selectedDates[0].getTime();
    if(userSelectedDate < now){
        iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        });
        startBtn.disabled = true;
    }else{
        startBtn.disabled = false;
    }
  },});

  



  function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}



function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}


startBtn.addEventListener("click", () => {
  const futureTime = userSelectedDate;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = futureTime - currentTime;

    if (diff <= 0) {
      clearInterval(intervalId);
      startBtn.disabled = false;
      return;
    }

    const str = convertMs(diff);

    const days = addLeadingZero(str.days);
    const hours = addLeadingZero(str.hours);
    const minutes = addLeadingZero(str.minutes);
    const seconds = addLeadingZero(str.seconds);

    timer.innerHTML = `<div class="field">
      <span class="value" data-days>${days}</span>
      <span class="label">Days</span>
    </div>
    <div class="field">
      <span class="value" data-hours>${hours}</span>
      <span class="label">Hours</span>
    </div>
    <div class="field">
      <span class="value" data-minutes>${minutes}</span>
      <span class="label">Minutes</span>
    </div>
    <div class="field">
      <span class="value" data-seconds>${seconds}</span>
      <span class="label">Seconds</span>
    </div>`;

    startBtn.disabled = true;
  }, 1000);
});