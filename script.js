// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Initialize theme - use in-memory storage instead of localStorage
let currentTheme = "light";
body.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// Mobile menu toggle
const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.querySelector(".nav-menu");

mobileToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  const icon = mobileToggle.querySelector("i");
  icon.className = navMenu.classList.contains("active")
    ? "fas fa-times"
    : "fas fa-bars";
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      navMenu.classList.remove("active");
      mobileToggle.querySelector("i").className = "fas fa-bars";
    }
  });
});

// Animate skill bars when they come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-progress");
      skillBars.forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
      });
    }
  });
}, observerOptions);

document.querySelectorAll(".skills-grid").forEach((section) => {
  observer.observe(section);
});

// Contact form handling
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector(".submit-btn");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.");
    contactForm.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background =
      currentTheme === "dark"
        ? "rgba(15, 23, 42, 0.98)"
        : "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.background =
      currentTheme === "dark"
        ? "rgba(15, 23, 42, 0.95)"
        : "rgba(255, 255, 255, 0.95)";
  }
});
