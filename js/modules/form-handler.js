/* Form handler: contact form client-side validation and submission status. */

export function init() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    /* Clear previous status */
    status.textContent = '';
    status.className = 'form-status';

    /* Validate required fields */
    const name = form.querySelector('#contact-name');
    const email = form.querySelector('#contact-email');
    const message = form.querySelector('#contact-message');

    /* Reset error states */
    form.querySelectorAll('.form-input--error').forEach((el) => {
      el.classList.remove('form-input--error');
    });

    let hasErrors = false;

    if (!name.value.trim()) {
      name.classList.add('form-input--error');
      hasErrors = true;
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
      email.classList.add('form-input--error');
      hasErrors = true;
    }

    if (!message.value.trim()) {
      message.classList.add('form-input--error');
      hasErrors = true;
    }

    if (hasErrors) {
      status.textContent = 'Please fill in all required fields correctly.';
      status.classList.add('form-status--error');
      /* Focus first error field */
      form.querySelector('.form-input--error')?.focus();
      return;
    }

    /* Submit to Formspree */
    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    })
      .then((response) => {
        if (response.ok) {
          status.textContent = "Thank you! Your message has been sent. We'll get back to you soon.";
          status.classList.add('form-status--success');
          form.reset();
        } else {
          response.json().then((data) => {
            status.textContent = data.errors?.[0]?.message || 'Something went wrong. Please try again.';
            status.classList.add('form-status--error');
          });
        }
      })
      .catch(() => {
        status.textContent = 'Network error. Please check your connection and try again.';
        status.classList.add('form-status--error');
      });
  });

  /* Live validation — clear error on input */
  form.querySelectorAll('.form-input').forEach((input) => {
    input.addEventListener('input', () => {
      input.classList.remove('form-input--error');
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
