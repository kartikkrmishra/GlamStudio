// ===============================
// GLAM STUDIO BOOKING
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  saveBooking();

  loadUserBookings();
});

// ===============================
// Save Booking
// ===============================

function saveBooking() {
  const form = document.getElementById("bookingForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
      alert("Please login first.");

      window.location.href = "login.html";

      return;
    }

    const booking = {
      id: Date.now(),

      userName: user.name,

      userEmail: user.email,

      phone: document.getElementById("phone").value.trim(),

      service: document.getElementById("service").value,

      date: document.getElementById("date").value,

      time: document.getElementById("time").value,

      message: document.getElementById("message").value.trim(),

      status: "Pending",
    };

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(booking);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Appointment booked successfully.");

    form.reset();

    window.location.href = "profile.html";
  });
}

// ===============================
// Load User Bookings
// ===============================

function loadUserBookings() {
  const tableBody = document.getElementById("bookingTableBody");

  if (!tableBody) return;

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) return;

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  const userBookings = bookings.filter((item) => item.userEmail === user.email);

  const emptyBox = document.getElementById("noBookings");

  const table = document.getElementById("bookingTable");

  if (userBookings.length === 0) {
    emptyBox.style.display = "block";

    table.style.display = "none";

    return;
  }

  emptyBox.style.display = "none";

  table.style.display = "table";

  tableBody.innerHTML = "";

  let pending = 0;
  let completed = 0;

  userBookings.forEach((item) => {
    if (item.status === "Pending") pending++;

    if (item.status === "Completed") completed++;

    tableBody.innerHTML += `

        <tr>

            <td>${item.service}</td>

            <td>${formatBookingDate(item.date)}</td>

            <td>${item.time}</td>

            <td>

                <span class="status ${item.status.toLowerCase()}">

                    ${item.status}

                </span>

            </td>

        </tr>

        `;
  });

  document.getElementById("totalBookings").textContent = userBookings.length;

  document.getElementById("pendingBookings").textContent = pending;

  document.getElementById("completedBookings").textContent = completed;
}

// ===============================
// Format Date
// ===============================

function formatBookingDate(date) {
  return new Date(date).toLocaleDateString();
}
