// ===============================
// GLAM STUDIO
// Common JavaScript
// ===============================

// Wait for page to load

document.addEventListener("DOMContentLoaded", () => {
  highlightActivePage();

  updateNavigation();

  setupContactForm();
});

// ===============================
// Highlight Active Navigation
// ===============================

function highlightActivePage() {
  const links = document.querySelectorAll("nav a");

  const currentPage = window.location.pathname.split("/").pop();

  links.forEach((link) => {
    const page = link.getAttribute("href");

    if (page === currentPage) {
      link.classList.add("active");
    }
  });
}

// ===============================
// Update Navigation
// ===============================

function updateNavigation() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const nav = document.querySelector("nav");

  if (!nav) return;

  let loginLink = nav.querySelector('a[href="login.html"]');

  if (!loginLink) return;

  if (user) {
    loginLink.textContent = "Profile";
    loginLink.href = "profile.html";
  } else {
    loginLink.textContent = "Login";
    loginLink.href = "login.html";
  }
}

// ===============================
// Contact Form
// ===============================

function setupContactForm() {
  const form = document.getElementById("contactForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    alert("Thank you! Your message has been received.");

    form.reset();
  });
}

// ===============================
// Utility
// ===============================

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString();
}
