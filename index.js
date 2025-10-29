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

        // Initial check
        fadeInOnScroll();

        // Check on scroll
        window.addEventListener("scroll", fadeInOnScroll);

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

          // Random size between 2px and 6px
          const size = Math.random() * 4 + 2;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;

          // Random position
          particle.style.left = `${Math.random() * 100}%`;

          // Random animation delay and duration
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

              // Close mobile menu if open
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

  // utility: show screen by index
  function showScreen(n){
    screens.forEach((s,i)=>{
      s.classList.toggle('active', i===n);
    });
  }

  // simulate a tap at position within device-screen
  function simulateTap(xPct, yPct, pressTargetSelector){
    const screenRect = document.querySelector('.device-screen').getBoundingClientRect();
    const x = screenRect.left + (screenRect.width * xPct);
    const y = screenRect.top + (screenRect.height * yPct);

    // position the finger (relative to the whole page)
    finger.style.left = `${x}px`;
    finger.style.top = `${y}px`;
    finger.style.opacity = '1';

    // locate button to press (optional)
    const pressTarget = document.querySelector('.device-screen .active ' + (pressTargetSelector || ''));

    // visual press: add class to target
    if (pressTarget){
      pressTarget.classList.add('press');
      setTimeout(()=> pressTarget.classList.remove('press'), 420);
    }

    // retract finger after short delay
    setTimeout(()=> finger.style.opacity = '0', 520);
  }

  // higher-level sequence per screen
  function stepSequence(n){
    switch(n){
      case 0:
        // on dashboard: tap "Send" button then switch to transactions
        simulateTap(0.66, 0.77, '.screen-1 .app-btn.primary');
        setTimeout(()=> { showScreen(1); }, 920);
        break;
      case 1:
        // on transactions: tap 'See All' then bounce to analytics
        setTimeout(()=> simulateTap(0.5, 0.85, '.screen-2 .app-btn'), 220);
        setTimeout(()=> { showScreen(2); }, 980);
        break;
      case 2:
        // on analytics: tap a bar to animate then return to dashboard
        simulateTap(0.34, 0.6, '');
        // animate bars
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

  // start cycle
  function startCycle(){
    showScreen(0);
    idx = 0;
    if (cycleTimer) clearInterval(cycleTimer);
    cycleTimer = setInterval(()=>{
      idx = (idx + 1) % 3;
      stepSequence(idx);
    }, 3000);
  }

  // wait until DOM ready-ish and start
  document.addEventListener('DOMContentLoaded', ()=>{
    // small delay to ensure layout sizes are ready
    setTimeout(()=> startCycle(), 600);
  });

  // pause animation when user hovers (optional nice UX)
  const hero = document.querySelector('.hero-touch');
  hero.addEventListener('mouseenter', ()=> { if(cycleTimer) clearInterval(cycleTimer); });
  hero.addEventListener('mouseleave', ()=> { startCycle(); });
})();
