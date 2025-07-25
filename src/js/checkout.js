import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

// Add event listener for zip code input
document.getElementById("zip").addEventListener("blur", () => {
  checkout.updateOnZipCode();
});

// Handle form submission
document.getElementById("checkout").addEventListener("submit", (e) => {
  e.preventDefault();
  // In a real app, you would process the payment here
  alert("Order submitted successfully!");
  // Clear the cart
  localStorage.removeItem("so-cart");
  // Redirect to confirmation page or home
  window.location.href = "/index.html";
});
