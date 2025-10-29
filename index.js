// Scroll animations
document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeInOnScroll = function () {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible");
      }
    });
  };

  fadeInOnScroll();
  window.addEventListener("scroll", fadeInOnScroll);

  // ✅ Stats Count-Up Animation
  const counters = document.querySelectorAll(".stat-box .value");
  let statsStarted = false;

  const animateCounters = () => {
    if (statsStarted) return;
    statsStarted = true;

    counters.forEach(counter => {
      const originalText = counter.innerText;
      const target = parseInt(originalText.replace(/[^0-9]/g, ""));
      const duration = 3500;
      const stepTime = 30;
      let current = 0;

      const timer = setInterval(() => {
        current += Math.ceil(target / (duration / stepTime));

        if (current >= target) {
          counter.innerText = originalText;
          clearInterval(timer);
        } else {
          counter.innerText = originalText.includes("%")
            ? current + "%"
            : originalText.includes("+")
            ? current + "+"
            : current;
        }
      }, stepTime);
    });
  };

  const statsSection = document.querySelector(".stats-grid");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) animateCounters();
    }, { threshold: 0.4 });

    statsObserver.observe(statsSection);
  }

  // Mobile menu toggle
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.getElementById("navLinks");

  mobileMenu.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  // Particle animation
  const particlesContainer = document.getElementById("particles");
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}%`;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 15;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    particlesContainer.appendChild(particle);
  }

  // Form submission
  const form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your inquiry! We will get back to you soon.");
      form.reset();
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        if (window.innerWidth <= 768) {
          navLinks.classList.remove("active");
        }
      }
    });
  });
});

// Simulated touch interaction controller
(function(){
  const screens = Array.from(document.querySelectorAll('.device-screen .screen'));
  const finger = document.querySelector('.sim-finger');
  const device = document.querySelector('.device-frame');

  let idx = 0;
  let cycleTimer = null;

  function showScreen(n){
    screens.forEach((s,i)=>{
      s.classList.toggle('active', i===n);
    });
  }

  function simulateTap(xPct, yPct, pressTargetSelector){
    const screenRect = document.querySelector('.device-screen').getBoundingClientRect();
    const x = screenRect.left + (screenRect.width * xPct);
    const y = screenRect.top + (screenRect.height * yPct);

    finger.style.left = `${x}px`;
    finger.style.top = `${y}px`;
    finger.style.opacity = '1';

    const pressTarget = document.querySelector('.device-screen .active ' + (pressTargetSelector || ''));

    if (pressTarget){
      pressTarget.classList.add('press');
      setTimeout(()=> pressTarget.classList.remove('press'), 420);
    }

    setTimeout(()=> finger.style.opacity = '0', 520);
  }

  function stepSequence(n){
    switch(n){
      case 0:
        simulateTap(0.66, 0.77, '.screen-1 .app-btn.primary');
        setTimeout(()=> { showScreen(1); }, 920);
        break;
      case 1:
        setTimeout(()=> simulateTap(0.5, 0.85, '.screen-2 .app-btn'), 220);
        setTimeout(()=> { showScreen(2); }, 980);
        break;
      case 2:
        simulateTap(0.34, 0.6, '');
        const bars = document.querySelectorAll('.screen-3 .bar');
        bars.forEach((b, i)=> {
          const newH = [40,68,78,55,88][i] + Math.floor(Math.random()*6);
          b.style.height = newH + '%';
        });
        setTimeout(()=> { showScreen(0); }, 1100);
        break;
      default:
        showScreen(0);
    }
  }

  function startCycle(){
    showScreen(0);
    idx = 0;
    if (cycleTimer) clearInterval(cycleTimer);
    cycleTimer = setInterval(()=>{
      idx = (idx + 1) % 3;
      stepSequence(idx);
    }, 3000);
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(()=> startCycle(), 600);
  });

  const hero = document.querySelector('.hero-touch');
  hero.addEventListener('mouseenter', ()=> { if(cycleTimer) clearInterval(cycleTimer); });
  hero.addEventListener('mouseleave', ()=> { startCycle(); });
})();
const cards = document.querySelectorAll(".case-card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      const stats = entry.target.querySelectorAll(".stat-value");
      stats.forEach(stat => {
        const target = parseFloat(stat.textContent);
        let start = 0;
        let duration = 1200;
        let stepTime = 20;

        let counter = setInterval(() => {
          start += target / (duration / stepTime);
          if (start >= target) {
            stat.textContent = target + (stat.textContent.includes("%") ? "%" : "");
            clearInterval(counter);
          } else {
            stat.textContent = Math.floor(start) + (stat.textContent.includes("%") ? "%" : "");
          }
        }, stepTime);
      });

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

cards.forEach(card => observer.observe(card));
const valueCards = document.querySelectorAll(".value-card");

const valsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add("visible");
      valsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

valueCards.forEach(card => valsObserver.observe(card));