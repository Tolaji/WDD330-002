// cart.mjs or cart.js

import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

// Main render function
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
  updateCartCount(); // Update cart badge
}

// Renders a single cart item
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
    <div class="cart-card__details">
      <a href="#">
        <h2 class="card__name">${name}</h2>
      </a>
      <p class="cart-card__color">Color: ${color}</p>
      <p class="cart-card__price">Price: $${(price * quantity).toFixed(2)}</p>

     
       <div class="quantity-control">
        <button class="qty-btn decrease" data-index="${index}">−</button>
        <input type="number" id="quantity-${index}" class="cart-card__quantity-input" min="1" value="${quantity}" data-index="${index}" />
        <button class="qty-btn increase" data-index="${index}">+</button>
      </div>
      
       <button class="remove-btn" data-index="${index}">Remove</button>
    </div>
  </li>`;
}


// Attaches listeners to quantity input and +/- buttons
function attachQuantityListeners() {
  const quantityInputs = document.querySelectorAll(".cart-card__quantity-input");
  const increaseButtons = document.querySelectorAll(".qty-btn.increase");
  const decreaseButtons = document.querySelectorAll(".qty-btn.decrease");
  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      let cartItems = getLocalStorage("so-cart");
      cartItems.splice(index, 1); // Remove item at index
      setLocalStorage("so-cart", cartItems);
      renderCartContents();
    });
  });


  quantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      updateQuantity(e.target.dataset.index, parseInt(e.target.value));
    });
  });

  increaseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      const cartItems = getLocalStorage("so-cart");
      cartItems[index].Quantity += 1;
      setLocalStorage("so-cart", cartItems);
      renderCartContents();
    });
  });

  decreaseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      const cartItems = getLocalStorage("so-cart");
      if (cartItems[index].Quantity > 1) {
        cartItems[index].Quantity -= 1;
        setLocalStorage("so-cart", cartItems);
        renderCartContents();
      }
    });
  });
}

// Updates quantity from input field
function updateQuantity(index, newQty) {
  const validatedQty = newQty < 1 || isNaN(newQty) ? 1 : newQty;

  const cartItems = getLocalStorage("so-cart");
  cartItems[index].Quantity = validatedQty;

  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

// Calculate subtotal, tax, shipping, and total
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

// Initialize
renderCartContents();
