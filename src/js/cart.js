import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  if (!Array.isArray(cartItems)) {
    console.warn("⚠️ cartItems is not an array. Resetting to empty array.");
    cartItems = [];
  }

  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  attachQuantityListeners(); // Listen for qty changes
  renderCartTotal(); // Update totals
  updateCartCount();
}

function cartItemTemplate(item, index) {
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
    <label for="quantity-${index}">Qty:</label>
    <input type="number" id="quantity-${index}" class="cart-card__quantity-input" min="1" value="${quantity}" data-index="${index}" />
    <p class="cart-card__price">$${(price * quantity).toFixed(2)}</p>
  </li>`;
}

function attachQuantityListeners() {
  const quantityInputs = document.querySelectorAll(".cart-card__quantity-input");

  quantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const index = parseInt(e.target.dataset.index);
      const newQty = parseInt(e.target.value);

      if (newQty < 1 || isNaN(newQty)) {
        e.target.value = 1;
        return;
      }

      const cartItems = getLocalStorage("so-cart");
      cartItems[index].Quantity = newQty;

      setLocalStorage("so-cart", cartItems);
      renderCartContents(); // Re-render the cart with updated values
    });
  });
}

function renderCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  let itemCount = 0;
  let subtotal = 0;

  cartItems.forEach(item => {
    const quantity = item.Quantity ?? 1;
    itemCount += quantity;
    subtotal += (item.FinalPrice || 0) * quantity;
  });

  const tax = subtotal * 0.06;
  const shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
  const total = subtotal + tax + shipping;

  document.querySelector("#cart-subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector("#cart-tax").textContent = `$${tax.toFixed(2)}`;
  document.querySelector("#cart-shipping").textContent = `$${shipping.toFixed(2)}`;
  document.querySelector("#cart-total").textContent = `$${total.toFixed(2)}`;

  const cartFooter = document.querySelector(".cart-sum");
  if (cartItems.length > 0) {
    cartFooter.classList.remove("hide");
  } else {
    cartFooter.classList.add("hide");
  }
}

// Initialize everything
renderCartContents();
