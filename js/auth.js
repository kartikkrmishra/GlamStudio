// ===============================
// GLAM STUDIO AUTH
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  createDefaultAdmin();

  registerUser();

  loginUser();

  loadProfile();

  logoutUser();

  protectPages();
});

// ===============================
// Default Admin
// ===============================

function createDefaultAdmin() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const adminExists = users.some((user) => user.email === "admin@glam.com");

  if (!adminExists) {
    users.push({
      name: "Administrator",
      email: "admin@glam.com",
      phone: "9999999999",
      password: "admin123",
      role: "admin",
    });

    localStorage.setItem("users", JSON.stringify(users));
  }
}

// ===============================
// Register
// ===============================

function registerUser() {
  const form = document.getElementById("registerForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document
      .getElementById("registerEmail")
      .value.trim()
      .toLowerCase();
    const phone = document.getElementById("registerPhone").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some((user) => user.email === email);

    if (exists) {
      alert("Email already registered.");
      return;
    }

    users.push({
      name,
      email,
      phone,
      password,
      role: "user",
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful.");

    window.location.href = "login.html";
  });
}

// ===============================
// Login
// ===============================

function loginUser() {
  const form = document.getElementById("loginForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document
      .getElementById("loginEmail")
      .value.trim()
      .toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (item) => item.email === email && item.password === password,
    );

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login successful.");

    if (user.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "profile.html";
    }
  });
}

// ===============================
// Profile
// ===============================

function loadProfile() {
  const name = document.getElementById("profileName");

  if (!name) return;

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) return;

  document.getElementById("profileName").textContent = user.name;
  document.getElementById("profileEmail").textContent = user.email;
  document.getElementById("profilePhone").textContent = user.phone;
}

// ===============================
// Logout
// ===============================

function logoutUser() {
  const logoutBtn = document.getElementById("logoutBtn");
  const adminLogoutBtn = document.getElementById("adminLogoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");

      window.location.href = "login.html";
    });
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");

      window.location.href = "login.html";
    });
  }
}

// ===============================
// Route Protection
// ===============================

function protectPages() {
  const page = window.location.pathname.split("/").pop();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (page === "profile.html" && !user) {
    window.location.href = "login.html";
    return;
  }

  if (page === "admin.html") {
    if (!user || user.role !== "admin") {
      window.location.href = "login.html";
    }
  }
}
