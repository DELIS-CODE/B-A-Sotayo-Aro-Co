// Hero slideshow with autoplay + manual arrow navigation
const slides = document.querySelectorAll('.hero .slide');
const prevArrow = document.getElementById('prevArrow');
const nextArrow = document.getElementById('nextArrow');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function startAutoplay() {
  if (slides.length > 1) {
    slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 6000);
  }
}

function resetAutoplay() {
  clearInterval(slideInterval);
  startAutoplay();
}

if (slides.length > 1) {
  startAutoplay();
}

if (prevArrow) {
  prevArrow.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
    resetAutoplay();
  });
}

if (nextArrow) {
  nextArrow.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
    resetAutoplay();
  });
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// Scroll reveal animation
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealEls.forEach(el => revealObserver.observe(el));

// ---------- EmailJS config ----------
const EMAILJS_SERVICE_ID = 'service_lox361q';
const EMAILJS_BOOKING_TEMPLATE_ID = 'template_9zk4p5o';
const EMAILJS_CONTACT_TEMPLATE_ID = 'template_m89zqin';

// ---------- Book a Meeting form ----------
const bookingForm = document.getElementById('bookingForm');
const formStatus = document.getElementById('formStatus');

if (bookingForm) {
  const apptDate = document.getElementById('apptDate');
  if (apptDate) {
    const today = new Date().toISOString().split('T')[0];
    apptDate.setAttribute('min', today);
  }

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const date = document.getElementById('apptDate').value;
    const time = document.getElementById('apptTime').value;

    if (!fullName || !email || !date || !time) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.className = 'form-status error';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.className = 'form-status error';
      return;
    }

    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    formStatus.textContent = 'Sending...';
    formStatus.className = 'form-status';

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_BOOKING_TEMPLATE_ID, {
      from_name: fullName,
      from_email: email,
      appt_date: date,
      appt_time: time
    })
    .then(() => {
      formStatus.textContent = `Thanks, ${fullName}! Your request has been received — we'll be in touch shortly.`;
      formStatus.className = 'form-status success';
      bookingForm.reset();
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      formStatus.textContent = 'Something went wrong sending your request. Please try again or call us directly.';
      formStatus.className = 'form-status error';
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
  });
}

// ---------- Contact form ----------
const contactForm = document.getElementById('contactForm');
const contactFormStatus = document.getElementById('contactFormStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const message = document.getElementById('cMessage').value.trim();

    if (!name || !email) {
      contactFormStatus.textContent = 'Please fill in all required fields.';
      contactFormStatus.className = 'form-status error';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      contactFormStatus.textContent = 'Please enter a valid email address.';
      contactFormStatus.className = 'form-status error';
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    contactFormStatus.textContent = 'Sending...';
    contactFormStatus.className = 'form-status';

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE_ID, {
      from_name: name,
      from_email: email,
      message: message
    })
    .then(() => {
      contactFormStatus.textContent = `Thanks, ${name}! Your message has been received — we'll be in touch shortly.`;
      contactFormStatus.className = 'form-status success';
      contactForm.reset();
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      contactFormStatus.textContent = 'Something went wrong sending your message. Please try again or call us directly.';
      contactFormStatus.className = 'form-status error';
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
  });
}

// ---------- Newsletter form ----------
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    input.value = '';
    input.placeholder = 'Subscribed!';
  });
}