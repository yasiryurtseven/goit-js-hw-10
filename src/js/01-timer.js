// Belgelerde açıklandığı gibi
import flatpickr from 'flatpickr';
// Ek stil dosyalarını içe aktar
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker');
let selectedDate = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log(selectedDates[0]);

    if (selectedDate <= new Date()) {
      startBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputDate, {
  ...options,
});

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
let timerId = null;
startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  inputDate.disabled = true;

  timerId = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = selectedDate - currentTime;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      startBtn.disabled = false;
      inputDate.disabled = false;
      return;
    }

    const result = convertMs(timeLeft);
    const day = result.days;
    const hour = result.hours;
    const minute = result.minutes;
    const second = result.seconds;

    const daysEl = document.querySelector('[data-days]');
    const hoursEl = document.querySelector('[data-hours]');
    const minutesEl = document.querySelector('[data-minutes]');
    const secondsEl = document.querySelector('[data-seconds]');

    daysEl.textContent = addLeadingZero(day);
    hoursEl.textContent = addLeadingZero(hour);
    minutesEl.textContent = addLeadingZero(minute);
    secondsEl.textContent = addLeadingZero(second);

    console.log(
      `${addLeadingZero(day)}:${addLeadingZero(hour)}:${addLeadingZero(minute)}:${addLeadingZero(second)}`
    );
  }, 1000);
});
