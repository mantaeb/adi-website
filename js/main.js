/* ============================================
   Adi Dwek Bonar - Main JavaScript
   Handles: mobile menu toggle, contact form
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // Contact form enhancement
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('.submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          if (status) {
            status.className = 'form-status success';
            status.textContent = 'Thank you! Your message has been sent.';
          }
          form.reset();
        } else {
          if (status) {
            status.className = 'form-status error';
            status.textContent = 'Something went wrong. Please try again or email adi@bonar1.com directly.';
          }
        }
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }).catch(function () {
        if (status) {
          status.className = 'form-status error';
          status.textContent = 'Something went wrong. Please try again or email adi@bonar1.com directly.';
        }
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      });
    });
  }
});
