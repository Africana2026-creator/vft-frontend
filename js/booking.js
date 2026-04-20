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

// ===== SERVICE SELECTION =====
document.querySelectorAll(".service-item.selectable").forEach(item => {
  const checkbox = item.querySelector(".service-checkbox");
  const name = checkbox.dataset.name;
  const price = parseFloat(checkbox.dataset.price);

  // Restore state
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

// ===== SUMMARY =====
function updateSummary() {
  const summary = document.getElementById("booking-summary");
  const total = document.getElementById("total-price");

  if (!summary || !total) return;

  summary.innerHTML = "";

  selectedServices.forEach(service => {
    const li = document.createElement("li");
    li.textContent = `${service.name} - $${service.price}`;
    summary.appendChild(li);
  });

  total.textContent = `$${getTotalPrice()}`;
}

updateSummary();

// ===== PROCEED BUTTON =====
document.getElementById("proceedBtn")?.addEventListener("click", () => {
  if (selectedServices.length === 0) {
    alert("Please select at least one service to proceed.");
    return;
  }

  saveState();
  window.location.href = "booking-confirmation.html";
});