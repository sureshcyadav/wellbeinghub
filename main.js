document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var toggles = document.querySelectorAll('.service-toggle');
  toggles.forEach(function (button) {
    button.addEventListener('click', function () {
      var details = button.closest('.service-item').querySelector('.service-details');
      if (!details) return;
      details.classList.toggle('open');
      button.classList.toggle('open');
    });
  });

  var revealItems = document.querySelectorAll('.reveal-up');
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealItems.forEach(function (item) { revealObserver.observe(item); });
});

function goToStep(step) {
  var currentStep = document.querySelector('.form-step.active');
  if (currentStep) currentStep.classList.remove('active');

  var nextStep = document.getElementById('step-' + step);
  if (nextStep) nextStep.classList.add('active');

  for (var i = 1; i <= 3; i++) {
    var circle = document.getElementById('circle-' + i);
    var line = document.getElementById('line-' + i);
    if (circle) circle.classList.toggle('active', i <= step);
    if (circle) circle.classList.toggle('inactive', i > step);
    if (line) line.classList.toggle('active', i < step);
    if (line) line.classList.toggle('inactive', i >= step);
  }

  if (step === 3) {
    var name = document.getElementById('book-name').value;
    var eventName = document.getElementById('book-event').value;
    var participants = document.getElementById('book-participants').value;
    document.getElementById('summary-name').textContent = name || 'Your name';
    document.getElementById('summary-event').textContent = eventName || 'Selected event';
    document.getElementById('summary-participants').textContent = participants || '1';
  }
}

function submitBooking(event) {
  event.preventDefault();
  var form = document.getElementById('booking-form');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  var success = document.getElementById('booking-success');
  if (success) {
    form.style.display = 'none';
    success.style.display = 'block';
    document.getElementById('confirm-name').textContent = document.getElementById('book-name').value || 'Guest';
    document.getElementById('confirm-event').textContent = document.getElementById('book-event').value || 'Selected event';
    document.getElementById('confirm-email').textContent = document.getElementById('book-email').value || 'your email';
  }
}

function resetBooking() {
  var form = document.getElementById('booking-form');
  var success = document.getElementById('booking-success');
  if (form && success) {
    form.reset();
    form.style.display = 'block';
    success.style.display = 'none';
    goToStep(1);
  }
}

function resetContact() {
  var form = document.getElementById('contact-form');
  var success = document.getElementById('contact-success');
  if (form && success) {
    form.reset();
    form.style.display = 'block';
    success.style.display = 'none';
  }
}

if (typeof document !== 'undefined') {
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      contactForm.style.display = 'none';
      var success = document.getElementById('contact-success');
      if (success) success.style.display = 'block';
    });
  }
}
