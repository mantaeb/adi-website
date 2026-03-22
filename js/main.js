/* ============================================
   Adi Dwek Bonar — Main JavaScript
   Handles: nav scroll effect, parallax hero,
            scroll animations, mobile menu,
            contact form
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── NAVBAR: transparent → frosted on scroll ─── */
  var header = document.getElementById('site-header');
  if (header) {
    function updateNav () {
      if (window.scrollY > 60) {
        header.classList.remove('transparent');
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
        header.classList.add('transparent');
      }
    }
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  /* ─── PARALLAX HERO BACKGROUND ─── */
  var heroBg = document.getElementById('hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      var rate = scrolled * 0.35;
      heroBg.style.transform = 'scale(1.08) translateY(' + rate + 'px)';
    }, { passive: true });
  }

  /* ─── SCROLL ANIMATIONS (IntersectionObserver) ─── */
  var fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) { observer.observe(el); });
  }

  /* ─── MOBILE MENU ─── */
  var toggle = document.getElementById('menu-toggle');
  var nav    = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }

  /* ─── SMOOTH SCROLL for in-page anchors ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var navH = header ? header.offsetHeight : 0;
        var top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ─── CONTACT FORM ─── */
  var form   = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name    = (form.querySelector('#name')    || {}).value || '';
      var email   = (form.querySelector('#email')   || {}).value || '';
      var phone   = (form.querySelector('#phone')   || {}).value || '';
      var message = (form.querySelector('#message') || {}).value || '';

      var body = 'Name: ' + name + '\n'
        + 'Email: ' + email + '\n'
        + (phone ? 'Phone: ' + phone + '\n' : '')
        + '\n' + message;

      var subject = 'Enquiry from adi.bonar1.com — ' + name;
      var mailto  = 'mailto:info@adi.bonar1.com?subject='
        + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailto;

      if (status) {
        status.className  = 'form-status success';
        status.textContent = 'Opening your email client…';
      }
    });
  }

});
