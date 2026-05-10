
  const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://vft-backend.onrender.com";

    document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enquiryForm");
  const feedback = form.querySelector(".form-feedback");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    feedback.textContent = "Sending enquiry...";
    feedback.style.color = "#555";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      feedback.textContent =
        "✅ Enquiry sent successfully. We will contact you shortly.";
      feedback.style.color = "green";
      form.reset();

    } catch (err) {
      feedback.textContent = "❌ Failed to send enquiry. Please try again.";
      feedback.style.color = "red";
      console.error(err);
    }
  });
});