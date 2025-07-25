import { getLocalStorage, updateCartCount } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  if (!Array.isArray(cartItems)) {
    console.warn("⚠️ cartItems is not an array. Resetting to empty array.");
    cartItems = [];
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  const cartFooter = document.querySelector(".cart-sum");
  if (cartItems.length > 0) {
    // Calculate subtotal
    const subtotal = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.FinalPrice) || 0;
      const quantity = item.Quantity ?? 1;
      return sum + price * quantity;
    }, 0);

    // Calculate item count for shipping
    const itemCount = cartItems.reduce((count, item) =>
      count + (item.Quantity ?? 1), 0);

    // Calculate tax (6%)
    const tax = subtotal * 0.06;

    // Calculate shipping ($10 first item, $2 each additional)
    const shipping = 10 + (itemCount - 1) * 2;

    // Calculate total
    const total = subtotal + tax + shipping;

    // Update all summary lines
    document.querySelector("#cart-subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector("#cart-tax").textContent = `$${tax.toFixed(2)}`;
    document.querySelector("#cart-shipping").textContent = `$${shipping.toFixed(2)}`;
    document.querySelector("#cart-total").textContent = `$${total.toFixed(2)}`;

    cartFooter.classList.remove("hide");
  } else {
    cartFooter.classList.add("hide");
  }

  updateCartCount();
}

function cartItemTemplate(item) {
  const image = item?.Image ?? "images/default.jpg";
  const name = item?.Name ?? "Unknown Item";
  const price = parseFloat(item?.FinalPrice) || 0;
  const color = item?.Colors?.[0]?.ColorName ?? "N/A";
  const quantity = item?.Quantity ?? 1;

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${image}" alt="${name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${name}</h2>
    </a>
    <p class="cart-card__color">${color}</p>
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <p class="cart-card__price">$${(price * quantity).toFixed(2)}</p>
  </li>`;
}

// Add this function to your cart.js
function renderCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  let itemCount = 0;
  let subtotal = 0;

  cartItems.forEach(item => {
    itemCount += item.quantity;
    subtotal += item.FinalPrice * item.quantity;
  });

  // Calculate tax (6%)
  const tax = subtotal * 0.06;

  // Calculate shipping ($10 first item, $2 each additional)
  const shipping = 10 + (itemCount - 1) * 2;

  // Calculate total
  const total = subtotal + tax + shipping;

  // Update the display
  document.querySelector("#cart-subtotal").innerHTML = `$${subtotal.toFixed(2)}`;
  document.querySelector("#cart-tax").innerHTML = `$${tax.toFixed(2)}`;
  document.querySelector("#cart-shipping").innerHTML = `$${shipping.toFixed(2)}`;
  document.querySelector("#cart-total").innerHTML = `$${total.toFixed(2)}`;

  // Show the summary
  document.querySelector(".cart-sum").classList.remove("hide");
}

// Call this function after rendering cart items
renderCartTotal();

renderCartContents();
