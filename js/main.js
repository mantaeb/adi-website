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
      // Build mailto body from form fields
      var name = form.querySelector('#name').value;
      var email = form.querySelector('#email').value;
      var phone = form.querySelector('#phone').value;
      var message = form.querySelector('#message').value;

      var body = 'Name: ' + name + '\n'
        + 'Email: ' + email + '\n'
        + (phone ? 'Phone: ' + phone + '\n' : '')
        + '\n' + message;

      var subject = 'Contact from adi.bonar1.com - ' + name;
      var mailtoLink = 'mailto:adi@bonar1.com?subject='
        + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      e.preventDefault();
      window.location.href = mailtoLink;

      if (status) {
        status.className = 'form-status success';
        status.textContent = 'Opening your email client...';
      }
    });
  }
});
