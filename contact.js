 // Scroll animations
      document.addEventListener("DOMContentLoaded", function () {
        const fadeElements = document.querySelectorAll(
          ".contact-method, .office-card"
        );

        const fadeInOnScroll = function () {
          fadeElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
              element.style.opacity = "1";
              element.style.transform = "translateY(0)";
            }
          });
        };

        // Set initial state for fade elements
        fadeElements.forEach((element) => {
          element.style.opacity = "0";
          element.style.transform = "translateY(20px)";
          element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        });

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

        // FAQ Accordion
        const faqItems = document.querySelectorAll(".faq-item");

        faqItems.forEach((item) => {
          const question = item.querySelector(".faq-question");

          question.addEventListener("click", function () {
            // Close all other items
            faqItems.forEach((otherItem) => {
              if (otherItem !== item) {
                otherItem.classList.remove("active");
              }
            });

            // Toggle current item
            item.classList.toggle("active");
          });
        });

        // Form submission
        const contactForm = document.getElementById("contactForm");
        const formSuccess = document.getElementById("formSuccess");

        contactForm.addEventListener("submit", function (e) {
          e.preventDefault();

          // Simple form validation
          const name = document.getElementById("name").value;
          const email = document.getElementById("email").value;
          const message = document.getElementById("message").value;

          if (name && email && message) {
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show the success message

            // Show success message
            formSuccess.style.display = "block";

            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
              formSuccess.style.display = "none";
            }, 5000);
          } else {
            alert("Please fill in all required fields (name, email, message).");
          }
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