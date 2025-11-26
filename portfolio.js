document.addEventListener("DOMContentLoaded", function () {
  // =======================
  // Scroll Fade-In
  // =======================
  const fadeElements = document.querySelectorAll(
    ".fade-in, .value-card, .case-card, .stats .value, .featured-stat .value"
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
  // Count-Up Animations
  // =======================
  const animateCounters = (counters) => {
    const animated = new Set();

    const formatNumber = (num, suffix) => {
      if (suffix === "M+") return (num / 1e6).toFixed(num >= 1e6 ? 1 : 0) + "M+";
      if (suffix === "K+") return Math.floor(num / 1e3) + "K+";
      return num.toLocaleString() + suffix;
    };

    const animateCounter = (counter) => {
      const finalText = counter.innerText.trim();
      const match = finalText.match(/([\d.]+)([%$A-Za-z+]*)/);
      if (!match) return;

      const value = parseFloat(match[1]);
      const suffix = match[2] || "";
      let endValue = value;

      if (suffix.includes("M")) endValue = value * 1e6;
      if (suffix.includes("K")) endValue = value * 1e3;

      const duration = 2500;
      const startTime = performance.now();

      function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(eased * endValue);

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

    const animateOnScroll = () => {
      counters.forEach((counter) => {
        if (animated.has(counter)) return;
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          animateCounter(counter);
          animated.add(counter);
        }
      });
    };

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();
  };

  animateCounters(document.querySelectorAll(".stats .value"));
  animateCounters(document.querySelectorAll(".case-card .stat-value"));
  animateCounters(document.querySelectorAll(".featured-stat .value"));

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
  // Device Simulation
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

  // =======================
  // Case Study Filtering
  // =======================
  const filterTabs = document.querySelectorAll(".filter-tab");
  const caseCards = document.querySelectorAll(".case-card");

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      filterTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-category");
      caseCards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-categories").includes(category)) {
          card.style.display = "block";
          setTimeout(() => card.classList.add("visible"), 100);
        } else {
          card.classList.remove("visible");
          setTimeout(() => { card.style.display = "none"; }, 300);
        }
      });
    });
  });

  // =======================
  // Portfolio Data & Modal
  // =======================
  const caseModal = document.getElementById("caseModal");
  const modalClose = document.getElementById("modalClose");
  const modalBody = document.getElementById("modalBody");
  const caseButtons = document.querySelectorAll(".case-card .btn-primary");

  const portfolio = {
    1: {
      title: "Mobile Banking Platform",
      category: "FinTech",
      description:
        "We partnered with a leading African bank to completely transform their digital banking experience. The project involved developing a new mobile banking platform from the ground up, with a focus on user experience, security, and scalability.",
      challenge:
        "The client needed to modernize their legacy banking systems to compete with digital-first financial services and meet growing customer expectations for mobile banking capabilities.",
      solution:
        "We designed and built a comprehensive mobile banking platform with features including account management, funds transfer, bill payments, loan applications, and investment tracking. The platform was built using React Native for cross-platform compatibility and integrated with the bank's existing core banking systems through secure APIs.",
      results: [
        { value: "45%", label: "Increase in User Engagement" },
        { value: "2M+", label: "Active Users" },
        { value: "60%", label: "Faster Transaction Processing" },
        { value: "99.9%", label: "Uptime" },
      ],
      technologies: ["React Native", "Node.js", "MongoDB", "AWS", "Docker"],
      testimonial:
        "Working with Createmodafrica transformed our digital banking capabilities. Their team delivered beyond our expectations and the results have been phenomenal.",
      author: "James Kariuki",
      position: "CTO, Pan-African Bank",
    },
    2: {
      title: "Omnichannel Retail Solution",
      category: "E-commerce",
      description:
        "We developed a unified commerce platform for a retail chain with both physical stores and online presence, creating a seamless shopping experience across all channels.",
      challenge:
        "The client struggled with disconnected systems for online and in-store sales, leading to inventory discrepancies, inconsistent customer experiences, and missed cross-selling opportunities.",
      solution:
        "We built an integrated omnichannel platform that unified inventory management, customer data, and sales channels. The solution included a responsive e-commerce website, mobile app, and POS integration for physical stores.",
      results: [
        { value: "78%", label: "Online Sales Growth" },
        { value: "3.2x", label: "Faster Checkout Process" },
        { value: "40%", label: "Reduced Inventory Costs" },
        { value: "25%", label: "Increase in Cross-channel Sales" },
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Stripe API"],
      testimonial:
        "The e-commerce platform they built for us has revolutionized our business. Sales have increased dramatically and customer feedback has been overwhelmingly positive.",
      author: "Sarah Mensah",
      position: "CEO, Retail Chain",
    },
    3: {
      title: "Telemedicine Platform",
      category: "HealthTech",
      description:
        "We created a comprehensive telehealth solution that enables remote consultations, electronic health records, and prescription management for healthcare providers across Africa.",
      challenge:
        "Healthcare access was limited in remote areas, and existing solutions were not optimized for low-bandwidth environments or integrated with local healthcare systems.",
      solution:
        "We developed a telemedicine platform with video consultations, secure messaging, electronic health records, and pharmacy integration. The platform was optimized for performance in areas with limited internet connectivity.",
      results: [
        { value: "60%", label: "Reduction in Healthcare Costs" },
        { value: "500K+", label: "Patients Served" },
        { value: "85%", label: "Patient Satisfaction" },
        { value: "40%", label: "Increase in Rural Access" },
      ],
      technologies: ["Vue.js", "Python", "PostgreSQL", "WebRTC", "AWS"],
      testimonial:
        "Their telemedicine solution has enabled us to reach patients in remote areas we couldn't serve before. The impact on healthcare access has been transformative.",
      author: "Dr. Adebayo Oluwaseun",
      position: "Medical Director, Health Network",
    },
    4: {
      title: "E-Learning Platform",
      category: "EdTech",
      description:
        "Built an interactive learning management system for a pan-African education provider.",
      challenge: "Needed a scalable LMS that could support thousands of students simultaneously.",
      solution:
        "Developed a responsive LMS with interactive content, progress tracking, and assessment tools.",
      results: [
        { value: "85%", label: "Completion Rate" },
        { value: "50K+", label: "Students Enrolled" },
      ],
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      testimonial:
        "The LMS has transformed how we deliver education online, increasing engagement and completion rates.",
      author: "Linda Mwangi",
      position: "Head of Digital Learning, EduCorp",
    },
    5: {
      title: "Supply Chain Management",
      category: "Logistics",
      description:
        "Developed an AI-powered logistics platform that reduced delivery times and costs.",
      challenge: "Client needed better visibility and optimization across their supply chain.",
      solution:
        "Built a predictive logistics platform with real-time tracking, AI routing, and analytics dashboards.",
      results: [
        { value: "40%", label: "Faster Delivery" },
        { value: "35%", label: "Cost Savings" },
      ],
      technologies: ["Python", "Django", "PostgreSQL", "AWS", "TensorFlow"],
      testimonial:
        "The platform has optimized our logistics operations, saving time and money.",
      author: "Michael Otieno",
      position: "Operations Director, Logistics Inc.",
    },
    6: {
      title: "Investment Platform",
      category: "FinTech",
      description:
        "Created a digital investment platform that democratized access to financial markets.",
      challenge: "Needed to provide secure, user-friendly access to investment tools.",
      solution:
        "Built a web and mobile investment platform with portfolio tracking, analytics, and payment integration.",
      results: [
        { value: "300%", label: "User Growth" },
        { value: "$1M+", label: "Assets Managed" },
      ],
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "AWS"],
      testimonial:
        "Users now have easy access to investment opportunities, and the platform's growth has exceeded expectations.",
      author: "Grace Njeri",
      position: "CEO, Investify",
    },
  };

  caseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const caseId = this.getAttribute("data-case");
      const caseData = portfolio[caseId];
      if (!caseData) return;

      modalBody.innerHTML = `
        <div class="modal-header">
          <span class="modal-tag">${caseData.category}</span>
          <h2>${caseData.title}</h2>
          <p>${caseData.description}</p>
        </div>
        <div class="modal-stats">
          ${caseData.results.map(r => `
            <div class="modal-stat">
              <div class="value">${r.value}</div>
              <div class="label">${r.label}</div>
            </div>
          `).join("")}
        </div>
        <div style="margin-bottom:30px;">
          <h3>The Challenge</h3>
          <p>${caseData.challenge}</p>
        </div>
        <div style="margin-bottom:30px;">
          <h3>Our Solution</h3>
          <p>${caseData.solution}</p>
        </div>
        <div style="margin-bottom:30px;">
          <h3>Technologies Used</h3>
          <div class="tech-tags" style="display:flex; flex-wrap:wrap; gap:10px;">
            ${caseData.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join("")}
          </div>
        </div>
        <div style="background-color:var(--white); padding:20px; border-radius:8px;">
          <p style="font-style:italic;">"${caseData.testimonial}"</p>
          <div style="font-weight:600;">${caseData.author}</div>
          <div style="font-size:0.9rem; color:var(--gray);">${caseData.position}</div>
        </div>
      `;

      caseModal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  modalClose.addEventListener("click", () => {
    caseModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", (event) => {
    if (event.target === caseModal) {
      caseModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
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
  
  