 // Case study data
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
          technologies: [
            "React",
            "Node.js",
            "PostgreSQL",
            "Redis",
            "Stripe API",
          ],
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
      };

      // Scroll animations
      document.addEventListener("DOMContentLoaded", function () {
        const fadeElements = document.querySelectorAll(".case-card");

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

        // Case study filtering
        const filterTabs = document.querySelectorAll(".filter-tab");
        const caseCards = document.querySelectorAll(".case-card");

        filterTabs.forEach((tab) => {
          tab.addEventListener("click", function () {
            // Remove active class from all tabs
            filterTabs.forEach((t) => t.classList.remove("active"));

            // Add active class to clicked tab
            this.classList.add("active");

            const category = this.getAttribute("data-category");

            // Show/hide case cards based on category
            caseCards.forEach((card) => {
              if (
                category === "all" ||
                card.getAttribute("data-categories").includes(category)
              ) {
                card.style.display = "block";
                // Add slight delay for staggered animation
                setTimeout(() => {
                  card.classList.add("visible");
                }, 100);
              } else {
                card.classList.remove("visible");
                setTimeout(() => {
                  card.style.display = "none";
                }, 300);
              }
            });
          });
        });

        // Case study modal
        const caseModal = document.getElementById("caseModal");
        const modalClose = document.getElementById("modalClose");
        const modalBody = document.getElementById("modalBody");
        const caseButtons = document.querySelectorAll(
          ".case-card .btn-primary"
        );

        caseButtons.forEach((button) => {
          button.addEventListener("click", function () {
            const caseId = this.getAttribute("data-case");
            const caseData = portfolio[caseId];

            if (caseData) {
              modalBody.innerHTML = `
                            <div class="modal-header">
                                <span class="modal-tag">${
                                  caseData.category
                                }</span>
                                <h2>${caseData.title}</h2>
                                <p>${caseData.description}</p>
                            </div>
                            
                            <div class="modal-stats">
                                ${caseData.results
                                  .map(
                                    (result) => `
                                    <div class="modal-stat">
                                        <div class="value">${result.value}</div>
                                        <div class="label">${result.label}</div>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                            
                            <div style="margin-bottom: 30px;">
                                <h3 style="margin-bottom: 15px;">The Challenge</h3>
                                <p>${caseData.challenge}</p>
                            </div>
                            
                            <div style="margin-bottom: 30px;">
                                <h3 style="margin-bottom: 15px;">Our Solution</h3>
                                <p>${caseData.solution}</p>
                            </div>
                            
                            <div style="margin-bottom: 30px;">
                                <h3 style="margin-bottom: 15px;">Technologies Used</h3>
                                <div class="tech-tags" style="display: flex; flex-wrap: wrap; gap: 10px;">
                                    ${caseData.technologies
                                      .map(
                                        (tech) => `
                                        <span class="tech-tag">${tech}</span>
                                    `
                                      )
                                      .join("")}
                                </div>
                            </div>
                            
                            <div style="background-color: var(--white); padding: 20px; border-radius: 8px;">
                                <p style="font-style: italic; margin-bottom: 15px;">"${
                                  caseData.testimonial
                                }"</p>
                                <div style="font-weight: 600;">${
                                  caseData.author
                                }</div>
                                <div style="font-size: 0.9rem; color: var(--gray);">${
                                  caseData.position
                                }</div>
                            </div>
                        `;

              caseModal.style.display = "block";
              document.body.style.overflow = "hidden";
            }
          });
        });

        modalClose.addEventListener("click", function () {
          caseModal.style.display = "none";
          document.body.style.overflow = "auto";
        });

        // Close modal when clicking outside
        window.addEventListener("click", function (event) {
          if (event.target === caseModal) {
            caseModal.style.display = "none";
            document.body.style.overflow = "auto";
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