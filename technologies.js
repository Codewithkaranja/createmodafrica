 // Scroll animations
      document.addEventListener("DOMContentLoaded", function () {
        const fadeElements = document.querySelectorAll(
          ".tech-card, .cert-card"
        );

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

        // Technology filtering
        const categoryTabs = document.querySelectorAll(".category-tab");
        const techCards = document.querySelectorAll(".tech-card");

        categoryTabs.forEach((tab) => {
          tab.addEventListener("click", function () {
            // Remove active class from all tabs
            categoryTabs.forEach((t) => t.classList.remove("active"));

            // Add active class to clicked tab
            this.classList.add("active");

            const category = this.getAttribute("data-category");

            // Show/hide tech cards based on category
            techCards.forEach((card) => {
              if (
                category === "all" ||
                card.getAttribute("data-categories").includes(category)
              ) {
                card.style.display = "block";
              } else {
                card.style.display = "none";
              }
            });
          });
        });

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