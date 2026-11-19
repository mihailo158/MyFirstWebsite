const form = document.getElementById('bookingForm');
const message = document.getElementById('formMessage');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Не перезавантажує сторінку

  const name = document.getElementById('name').value.trim();
  const service = document.getElementById('service').value;

  message.textContent = `Дякуємо, ${name}! Вашу демо-заявку на "${service}" прийнято.`;
  form.reset();
});
