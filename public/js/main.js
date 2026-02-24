/* ==============================================
   PORTFOLIO - MAIN JAVASCRIPT
   ============================================== */

document.addEventListener("DOMContentLoaded", () => {
    // ---- DOM Elements ----
    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    const navLinkEls = document.querySelectorAll(".nav-link");
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    const submitBtn = document.getElementById("submitBtn");
    const typingText = document.getElementById("typingText");

    // ==============================================
    // NAVBAR — Scroll Effect & Active Link
    // ==============================================
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        // Add/remove scrolled class for glass effect
        navbar.classList.toggle("scrolled", scrollY > 50);

        // Highlight active nav link based on scroll position
        updateActiveLink();

        lastScroll = scrollY;
    });

    function updateActiveLink() {
        const sections = document.querySelectorAll("section[id]");
        const scrollPos = window.scrollY + 150;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPos >= top && scrollPos < top + height) {
                navLinkEls.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    // ==============================================
    // HAMBURGER MENU (Mobile)
    // ==============================================
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("open");
        document.body.style.overflow = navLinks.classList.contains("open") ? "hidden" : "";
    });

    // Close menu on link click
    navLinkEls.forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("open");
            document.body.style.overflow = "";
        });
    });

    // ==============================================
    // TYPING ANIMATION (Hero)
    // ==============================================
    const phrases = [
        "Student",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typingText.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            // Pause at end of phrase
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // ==============================================
    // SCROLL-TRIGGERED ANIMATIONS (Intersection Observer)
    // ==============================================
    const animateElements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add delay if the element has --delay custom property
                    const delay = getComputedStyle(entry.target).getPropertyValue("--delay");
                    if (delay && delay.trim() !== "0s") {
                        const ms = parseFloat(delay) * 1000;
                        setTimeout(() => {
                            entry.target.classList.add("visible");
                        }, ms);
                    } else {
                        entry.target.classList.add("visible");
                    }
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    animateElements.forEach((el) => observer.observe(el));

    // ==============================================
    // SKILL BAR FILL ANIMATION
    // ==============================================
    const skillFills = document.querySelectorAll(".skill-fill");

    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const width = target.getAttribute("data-width");
                    target.style.width = width;
                    skillObserver.unobserve(target);
                }
            });
        },
        { threshold: 0.3 }
    );

    skillFills.forEach((fill) => skillObserver.observe(fill));


    // ==============================================
    // CONTACT FORM SUBMISSION
    // ==============================================
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("formName").value.trim();
        const email = document.getElementById("formEmail").value.trim();
        const message = document.getElementById("formMessage").value.trim();

        // Client-side validation
        if (!name || !email) {
            showFormStatus("Please fill in your name and email.", "error");
            return;
        }

        if (!isValidEmail(email)) {
            showFormStatus("Please enter a valid email address.", "error");
            return;
        }

        // Show loader
        const btnText = submitBtn.querySelector(".btn-text");
        const btnLoader = submitBtn.querySelector(".btn-loader");
        btnText.style.display = "none";
        btnLoader.style.display = "inline-flex";
        submitBtn.disabled = true;

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();

            if (response.ok) {
                showFormStatus(data.message || "Message sent successfully!", "success");
                contactForm.reset();
            } else {
                showFormStatus(data.message || "Something went wrong. Please try again.", "error");
            }
        } catch (err) {
            showFormStatus("Network error. Please check your connection and try again.", "error");
        } finally {
            // Reset button
            btnText.style.display = "inline";
            btnLoader.style.display = "none";
            submitBtn.disabled = false;
        }
    });

    function showFormStatus(msg, type) {
        formStatus.textContent = msg;
        formStatus.className = "form-status " + type;
        formStatus.style.display = "block";

        // Auto-hide after 5 seconds
        setTimeout(() => {
            formStatus.style.display = "none";
        }, 5000);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ==============================================
    // SMOOTH SCROLL for anchor links
    // ==============================================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const targetId = anchor.getAttribute("href");
            if (targetId === "#") return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
