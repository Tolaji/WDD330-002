import {
  loadHeaderFooter,
  getLocalStorage,
  setLocalStorage,
  updateCartCount,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector("#cart-list").innerHTML = htmlItems.join("");

  // Attach listeners to all remove buttons
  document.querySelectorAll(".cart-card__remove").forEach((button) => {
    button.addEventListener("click", removeItemFromCart);
  });

  // Link to checkout page
  document.getElementById("checkout").addEventListener("click", function () {
    window.location.href = "../checkout/index.html";
  });

  // Show total if items exist
  const cartFooter = document.querySelector(".cart-sum");
  if (cartItems.length > 0) {
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.FinalPrice) * item.quantity,
      0,
    );
    document.querySelector(".cart-total").textContent =
      `Total: $${total.toFixed(2)}`;
    cartFooter.classList.remove("hide");
  } else {
    cartFooter.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  return `
  <li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimarySmall}" alt="${item.Name}"
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${(item.FinalPrice * item.quantity).toFixed(2)}</p>
    <span class="cart-card__remove" data-id="${item.Id}">✖</span>
  </li>`;
}

function removeItemFromCart(e) {
  const idToRemove = e.target.dataset.id;
  let cartItems = getLocalStorage("so-cart") || [];

  const index = cartItems.findIndex((item) => item.Id === idToRemove);
  if (index !== -1) {
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;
    } else {
      cartItems.splice(index, 1); // Remove entire item if quantity is 1
    }
  }

  setLocalStorage("so-cart", cartItems);
  renderCartContents(); // re-render cart
  updateCartCount(); // Update cart count in header
}

loadHeaderFooter();
renderCartContents();
