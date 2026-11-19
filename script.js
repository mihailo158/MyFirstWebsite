const WEB3FORMS_KEY = '0563cd09-6c7a-4abf-8aae-056d31b56ec8';

AOS.init({
  duration: 750,
  once: true,
  offset: 60
});

document.querySelectorAll('.spotlight').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('active');
  });
});

const form = document.getElementById('bookingForm');
const message = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Надсилаємо...';

  const formData = new FormData(form);
  formData.append('access_key', WEB3FORMS_KEY);
  formData.append('subject', 'Нова заявка з сайту DentaCare!');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();

    if (result.success) {
      message.style.color = '#4ade80';
      message.textContent = 'Заявку надіслано! Адміністратор скоро з вами звʼяжеться.';
      form.reset();
    } else {
      throw new Error('Помилка ключа');
    }
  } catch (error) {
    message.style.color = '#f87171';
    message.textContent = 'Помилка відправки. Перевір інтернет і спробуй ще раз.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Надіслати заявку';
  }
});
