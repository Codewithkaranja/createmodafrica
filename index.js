document.addEventListener("DOMContentLoaded", function () {
  // =======================
  // Scroll Fade-In
  // =======================
  const fadeElements = document.querySelectorAll(
    ".fade-in, .value-card, .case-card, .stats .value, .case-stats .stat-value"
  );

  const fadeInOnScroll = () => {
    fadeElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 150) {
        el.classList.add("visible");
      }
    });
  };

  fadeInOnScroll();
  window.addEventListener("scroll", fadeInOnScroll);

  // =======================
  // Stats / Portfolio Counters On Scroll
  // =======================
  const counters = document.querySelectorAll(".stats .value, .case-stats .stat-value");
  const countersAnimated = new WeakSet(); // Track animated counters individually

  const formatNumber = (num, suffix) => {
    if (suffix === "M+") return (num / 1e6).toFixed(num >= 1e6 ? 1 : 0) + "M+";
    if (suffix === "K+") return Math.floor(num / 1e3) + "K+";
    return num.toLocaleString() + suffix;
  };

  const animateCounter = (counter) => {
    if (countersAnimated.has(counter)) return; // Only animate once
    countersAnimated.add(counter);

    const finalText = counter.innerText.trim();
    const match = finalText.match(/([\d.]+)([%A-Za-z+]*)/);
    if (!match) return;

    const value = parseFloat(match[1]);
    const suffix = match[2] || "";
    let endValue = value;

    if (suffix.includes("M")) endValue = value * 1e6;
    if (suffix.includes("K")) endValue = value * 1e3;

    const duration = 2500;
    const startTime = performance.now();

    counter.style.opacity = 0;
    counter.style.transform = "translateY(15px)";

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(eased * endValue);

      // Smoothly animate 100+ style values
      if (suffix === "+") {
        counter.innerText = Math.min(currentValue, value) + "+";
      } else {
        counter.innerText =
          suffix.includes("M") || suffix.includes("K")
            ? formatNumber(currentValue, suffix)
            : currentValue + suffix;
      }

      counter.style.opacity = eased;
      counter.style.transform = `translateY(${15 - 15 * eased}px)`;

      if (progress < 1) requestAnimationFrame(update);
      else counter.innerText = finalText;
    }

    requestAnimationFrame(update);
  };

  const animateCountersOnScroll = () => {
    counters.forEach((counter) => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        animateCounter(counter);
      }
    });
  };

  window.addEventListener("scroll", animateCountersOnScroll);
  animateCountersOnScroll(); // Trigger if already visible

  // =======================
  // Mobile Menu Toggle
  // =======================
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.getElementById("navLinks");

  if (mobileMenu) {
    mobileMenu.addEventListener("click", () =>
      navLinks.classList.toggle("active")
    );
  }

  // =======================
  // Particles Background
  // =======================
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");
      const size = Math.random() * 4 + 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      const delay = Math.random() * 15;
      const duration = Math.random() * 10 + 15;
      p.style.animationDelay = `${delay}s`;
      p.style.animationDuration = `${duration}s`;
      particlesContainer.appendChild(p);
    }
  }

  // =======================
  // Smooth Scrolling Anchors
  // =======================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
        if (window.innerWidth <= 768) navLinks.classList.remove("active");
      }
    });
  });

  // =======================
  // Form Submission Alert
  // =======================
  const form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! We'll get back to you shortly.");
      form.reset();
    });
  }

  // =======================
  // Optional: Device Simulation (touch/finger)
  // =======================
  const screens = Array.from(document.querySelectorAll(".device-screen .screen"));
  const finger = document.querySelector(".sim-finger");
  let idx = 0,
    cycleTimer = null;

  const showScreen = (n) =>
    screens.forEach((s, i) => s.classList.toggle("active", i === n));

  const simulateTap = (xPct, yPct, selector) => {
    if (!finger) return;
    const rect = document.querySelector(".device-screen").getBoundingClientRect();
    const x = rect.left + rect.width * xPct;
    const y = rect.top + rect.height * yPct;
    finger.style.left = `${x}px`;
    finger.style.top = `${y}px`;
    finger.style.opacity = "1";

    const pressTarget = selector
      ? document.querySelector(`.device-screen .active ${selector}`)
      : null;
    if (pressTarget) {
      pressTarget.classList.add("press");
      setTimeout(() => pressTarget.classList.remove("press"), 420);
    }

    setTimeout(() => (finger.style.opacity = "0"), 520);
  };

  const stepSequence = (n) => {
    switch (n) {
      case 0:
        simulateTap(0.66, 0.77, ".screen-1 .app-btn.primary");
        setTimeout(() => showScreen(1), 920);
        break;
      case 1:
        setTimeout(() => simulateTap(0.5, 0.85, ".screen-2 .app-btn"), 220);
        setTimeout(() => showScreen(2), 980);
        break;
      case 2:
        simulateTap(0.34, 0.6, "");
        document.querySelectorAll(".screen-3 .bar").forEach(
          (b, i) =>
            (b.style.height =
              [40, 68, 78, 55, 88][i] + Math.floor(Math.random() * 6) + "%")
        );
        setTimeout(() => showScreen(0), 1100);
        break;
      default:
        showScreen(0);
    }
  };

  const startCycle = () => {
    if (!screens.length) return;
    showScreen(0);
    idx = 0;
    if (cycleTimer) clearInterval(cycleTimer);
    cycleTimer = setInterval(() => {
      idx = (idx + 1) % 3;
      stepSequence(idx);
    }, 3000);
  };

  if (document.querySelector(".hero-touch")) {
    startCycle();
    const heroTouch = document.querySelector(".hero-touch");
    heroTouch.addEventListener("mouseenter", () => cycleTimer && clearInterval(cycleTimer));
    heroTouch.addEventListener("mouseleave", startCycle);
  }
});

 //swiper slider
      var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  
  
