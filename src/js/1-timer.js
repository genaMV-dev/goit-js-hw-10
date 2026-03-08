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
const inpCalendar = document.querySelector(`#datetime-picker`);
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let intervalId;
let userSelectedDate;

startBtn.disabled = true;
inpCalendar.disabled = false;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const now = Date.now();
    userSelectedDate = selectedDates[0].getTime();
    if(userSelectedDate <= now){
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
      inpCalendar.disabled = false;
      return; // ⬅️ КЛЮЧОВЕ
    }

    startBtn.disabled = true;
    inpCalendar.disabled = true;

    const str = convertMs(diff);

    const days = addLeadingZero(str.days);
    const hours = addLeadingZero(str.hours);
    const minutes = addLeadingZero(str.minutes);
    const seconds = addLeadingZero(str.seconds);

    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours;
    minutesEl.innerHTML = minutes;
    secondsEl.innerHTML = seconds;
  }, 1000);
});