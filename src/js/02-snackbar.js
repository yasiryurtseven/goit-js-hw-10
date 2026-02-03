import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const stateRadio = document.querySelector('input[name="state"]:checked');
  const delayInput = document.querySelector('input[name="delay"]');
  const delayMs = Number(delayInput.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateRadio.value === 'fulfilled') {
        resolve(delayMs);
      } else {
        reject(delayMs);
      }
    }, delayMs);
  });
  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
  form.reset();
});
