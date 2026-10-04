/* ============================================
   SAHIL KHAN - PORTFOLIO JAVASCRIPT
   ============================================ */

/* ===== CURSOR GLOW ===== */
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

/* ===== PARTICLES CANVAS ===== */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const PARTICLE_COUNT = 80;

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.6 + 0.1;
    this.color = Math.random() > 0.5 ? '124, 58, 237' : '6, 182, 212';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translateY(10px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

/* ===== ACTIVE NAV HIGHLIGHTING ===== */
function updateActiveNav() {
  const sections = ['home', 'about', 'skills', 'contact'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 100) current = id;
    }
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

/* ===== TYPED TEXT EFFECT ===== */
const typedEl = document.getElementById('typed-text');
const words = [
  'B.Tech CSE Student',
  'C Programmer',
  'Python Learner',
  'JECRC Warrior',
  'Future Engineer',
  'Code Enthusiast'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    typedEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 60;
  } else {
    typedEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 110;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typingSpeed = 1800;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 400;
  }

  setTimeout(typeText, typingSpeed);
}

setTimeout(typeText, 1200);

/* ===== SCROLL REVEAL ===== */
const revealElements = document.querySelectorAll(
  '.about-grid, .skill-card, .contact-card, .message-box, .download-card, .learning-path, .stat-card, .info-card, .tl-item'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ===== SKILL BAR ANIMATION ===== */
function animateSkillBars() {
  const cBar = document.getElementById('c-bar');
  const pyBar = document.getElementById('py-bar');
  const cPercent = document.getElementById('c-percent');
  const pyPercent = document.getElementById('py-percent');

  if (cBar && !cBar.dataset.animated) {
    cBar.dataset.animated = 'true';
    const cTarget = parseInt(cBar.dataset.target);
    const pyTarget = parseInt(pyBar.dataset.target);

    animateBar(cBar, cPercent, cTarget);
    animateBar(pyBar, pyPercent, pyTarget);
  }
}

function animateBar(bar, label, target) {
  let current = 0;
  const duration = 1500;
  const steps = 60;
  const increment = target / steps;
  const interval = duration / steps;

  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    bar.style.width = current + '%';
    label.textContent = Math.round(current) + '%';
    if (current >= target) clearInterval(timer);
  }, interval);
}

const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateSkillBars();
    skillsObserver.disconnect();
  }
}, { threshold: 0.3 });

if (skillsSection) skillsObserver.observe(skillsSection);

/* ===== CONTACT FORM ===== */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  btn.textContent = 'Sending... ⏳';
  btn.disabled = true;

  // Simulate sending
  setTimeout(() => {
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  }, 1500);
}

/* ===== DOWNLOAD CV ===== */
function downloadCV(e) {
  e.preventDefault();
  const btn = document.getElementById('download-btn');
  const originalHTML = btn.innerHTML;

  btn.innerHTML = '⏳ Preparing CV...';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    // Generate a simple text-based CV
    const cvContent = generateCV();
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sahil_Khan_CV.txt';
    a.click();
    URL.revokeObjectURL(url);

    btn.innerHTML = '✅ Downloaded!';
    btn.style.opacity = '1';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
    }, 3000);
  }, 1000);
}

function generateCV() {
  return `
╔══════════════════════════════════════════════════════════╗
║                    CURRICULUM VITAE                     ║
╚══════════════════════════════════════════════════════════╝

NAME: SAHIL KHAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION
────────────────────
• Email     : sahilkha2008@gmail.com
• LinkedIn  : https://www.linkedin.com/in/sahilkhan
• GitHub    : https://github.com/sahilkhan

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EDUCATION
────────────────────

B.Tech in Core CSE (Computer Science & Engineering)
  Institution  : JECRC University, Jaipur, Rajasthan
  Year         : 1st Year (Current)
  Duration     : 2026 – 2030 (Expected)

12th Standard
  Year Passed  : 2024
  Location     : Didwana Kuchaman, Rajasthan

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNICAL SKILLS
────────────────────

• C Language    : Intermediate (Variables, Loops, Functions, 
                  Arrays, Pointers, Memory Management)
• Python        : Beginner (Syntax, Basic Scripts, Learning)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABOUT ME
────────────────────

I am Sahil Khan, a passionate B.Tech CSE student from
Didwana Kuchaman, Rajasthan. Currently enrolled at JECRC
University, Jaipur, I am building a strong foundation in
programming and computer science. I completed my 12th
standard in 2024 and am enthusiastic about coding,
problem-solving, and technology.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LOCATION
────────────────────
• Hometown  : Didwana Kuchaman, Rajasthan, India
• Current   : Jaipur, Rajasthan, India

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated on: ${new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })}
  `;
}

/* ===== SMOOTH SCROLL for logo click ===== */
document.querySelector('.nav-logo').addEventListener('click', () => {
  document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
});

/* ===== CARD HOVER 3D TILT ===== */
document.querySelectorAll('.skill-card, .contact-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `translateY(-6px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
});
