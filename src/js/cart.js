import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  // Ensure we have a valid array
  if (!Array.isArray(cartItems)) {
    console.warn("⚠️ cartItems is not an array. Resetting to empty array.");
    cartItems = [];
  }

  console.log("✅ Cart items found:", cartItems);

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Show total if items exist
  const cartFooter = document.querySelector(".cart-sum");
  if (cartItems.length > 0) {
    const total = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.FinalPrice) || 0;
      const quantity = item.Quantity ?? 1;
      return sum + price * quantity;
    }, 0);

    document.querySelector(".cart-total").textContent =
      `Total: $${total.toFixed(2)}`;
    cartFooter.classList.remove("hide");
  } else {
    cartFooter.classList.add("hide");
  }
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

renderCartContents();
