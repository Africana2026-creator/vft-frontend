// ===== BOOKING STATE =====
let selectedServices = JSON.parse(sessionStorage.getItem("selectedServices")) || [];

// ===== SAVE STATE =====
function saveState() {
    sessionStorage.setItem("selectedServices", JSON.stringify(selectedServices));
    sessionStorage.setItem("totalPrice", getTotalPrice());
}

// ===== TOTAL PRICE =====
function getTotalPrice() {
    return selectedServices.reduce((sum, s) => sum + s.price, 0);
}
document.querySelectorAll(".service-item.selectable").forEach(item => {
    const checkbox = item.querySelector(".service-checkbox");
    const name = checkbox.dataset.name;
    const price = parseFloat(checkbox.dataset.price);

    // Restore state on reload
    if (selectedServices.some(s => s.name === name)) {
        checkbox.checked = true;
        item.classList.add("selected");
    }

    item.addEventListener("click", e => {
        if (e.target.tagName !== "INPUT") {
            checkbox.checked = !checkbox.checked;
        }
        updateSelection();
    });

    checkbox.addEventListener("change", updateSelection);

    function updateSelection() {
        if (checkbox.checked) {
            if (!selectedServices.some(s => s.name === name)) {
                selectedServices.push({ name, price });
            }
            item.classList.add("selected");
        } else {
            selectedServices = selectedServices.filter(s => s.name !== name);
            item.classList.remove("selected");
        }

        updateSummary();
        saveState();
    }
});
function updateSummary() {
    const summary = document.getElementById("booking-summary");
    const total = document.getElementById("total-price");

    summary.innerHTML = "";

    selectedServices.forEach(service => {
        const li = document.createElement("li");
        li.textContent = `${service.name} - $${service.price}`;
        summary.appendChild(li);
    });

    total.textContent = `$${getTotalPrice()}`;
}

updateSummary();
document.getElementById("proceedBtn").addEventListener("click", () => {
    if (selectedServices.length === 0) {
        alert("Please select at least one service to proceed.");
        return;
    }

    saveState();
    window.location.href = "booking-confirmation.html";
});
const services = JSON.parse(sessionStorage.getItem("selectedServices")) || [];
const total = sessionStorage.getItem("totalPrice");

if (services.length === 0) {
    alert("No booking data found. Redirecting...");
    window.location.href = "service.html";
}
const list = document.getElementById("confirm-services");

services.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.name} - $${s.price}`;
    list.appendChild(li);
});

document.getElementById("confirm-total").textContent = `$${total}`;
fetch("https://vft-backend.onrender.com/api/bookings", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    services: [
      { name: "BUNGEE JUMPING", price: 194 }
    ],
    total: 194
  })
})
.then(res => res.json())
.then(data => console.log("SUCCESS:", data))
.catch(err => console.error("ERROR:", err));