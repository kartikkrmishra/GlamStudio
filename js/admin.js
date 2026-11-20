// ===============================
// GLAM STUDIO ADMIN
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();

  loadBookings();

  loadUsers();

  setupButtons();
});

// ===============================
// Dashboard Summary
// ===============================

function loadDashboard() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  const totalUsers = users.filter((user) => user.role === "user").length;

  const pending = bookings.filter((item) => item.status === "Pending").length;

  const completed = bookings.filter(
    (item) => item.status === "Completed",
  ).length;

  document.getElementById("adminTotalUsers").textContent = totalUsers;
  document.getElementById("adminTotalBookings").textContent = bookings.length;
  document.getElementById("adminPendingBookings").textContent = pending;
  document.getElementById("adminCompletedBookings").textContent = completed;
}

// ===============================
// Load Bookings
// ===============================

function loadBookings() {
  const tableBody = document.getElementById("adminBookingTableBody");

  if (!tableBody) return;

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  tableBody.innerHTML = "";

  if (bookings.length === 0) {
    tableBody.innerHTML = `
            <tr>
                <td colspan="7">No appointments found.</td>
            </tr>
        `;

    return;
  }

  bookings.forEach((item) => {
    tableBody.innerHTML += `

        <tr>

            <td>${item.userName}</td>

            <td>${item.userEmail}</td>

            <td>${item.service}</td>

            <td>${new Date(item.date).toLocaleDateString()}</td>

            <td>${item.time}</td>

            <td>

                <select onchange="changeStatus(${item.id}, this.value)">

                    <option value="Pending" ${item.status === "Pending" ? "selected" : ""}>
                        Pending
                    </option>

                    <option value="Completed" ${item.status === "Completed" ? "selected" : ""}>
                        Completed
                    </option>

                </select>

            </td>

            <td>

                <button
                    class="btn btn-danger"
                    onclick="deleteBooking(${item.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;
  });
}

// ===============================
// Load Users
// ===============================

function loadUsers() {
  const tableBody = document.getElementById("userTableBody");

  if (!tableBody) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  tableBody.innerHTML = "";

  const normalUsers = users.filter((user) => user.role === "user");

  if (normalUsers.length === 0) {
    tableBody.innerHTML = `
            <tr>
                <td colspan="3">No users found.</td>
            </tr>
        `;

    return;
  }

  normalUsers.forEach((user) => {
    tableBody.innerHTML += `

        <tr>

            <td>${user.name}</td>

            <td>${user.email}</td>

            <td>${user.phone}</td>

        </tr>

        `;
  });
}

// ===============================
// Change Booking Status
// ===============================

function changeStatus(id, status) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  bookings = bookings.map((item) => {
    if (item.id === id) {
      item.status = status;
    }

    return item;
  });

  localStorage.setItem("bookings", JSON.stringify(bookings));

  loadDashboard();
  loadBookings();
}

// ===============================
// Delete Booking
// ===============================

function deleteBooking(id) {
  if (!confirm("Delete this appointment?")) return;

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  bookings = bookings.filter((item) => item.id !== id);

  localStorage.setItem("bookings", JSON.stringify(bookings));

  loadDashboard();

  loadBookings();
}

// ===============================
// Buttons
// ===============================

function setupButtons() {
  const clearBookingsBtn = document.getElementById("clearBookingsBtn");

  if (clearBookingsBtn) {
    clearBookingsBtn.addEventListener("click", () => {
      if (!confirm("Delete all bookings?")) return;

      localStorage.removeItem("bookings");

      loadDashboard();

      loadBookings();
    });
  }

  const clearUsersBtn = document.getElementById("clearUsersBtn");

  if (clearUsersBtn) {
    clearUsersBtn.addEventListener("click", () => {
      if (!confirm("Delete all users?")) return;

      let users = JSON.parse(localStorage.getItem("users")) || [];

      users = users.filter((user) => user.role === "admin");

      localStorage.setItem("users", JSON.stringify(users));

      localStorage.removeItem("bookings");

      loadDashboard();

      loadUsers();

      loadBookings();
    });
  }
}
