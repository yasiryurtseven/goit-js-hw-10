const form = document.querySelector('.feedback-form');
const storage = 'feedback-form-state';

const savedData = JSON.parse(localStorage.getItem(storage));

if (savedData) {
  form.elements.email.value = savedData.email ?? '';
  form.elements.message.value = savedData.message ?? '';
}

form.addEventListener('input', () => {
  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };

  localStorage.setItem(storage, JSON.stringify(formData));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Please fill the form');
    return;
  }

  console.log(formData);

  localStorage.removeItem(storage);
  form.reset();
});
