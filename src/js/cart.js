import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const rawCartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-sum");
  const cartTotal = document.querySelector(".cart-total");

  if (rawCartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.classList.add("hide");
    return;
  }

  const groupedItems = groupCartItems(rawCartItems);
  const htmlItems = groupedItems.map(cartItemTemplate);
  productList.innerHTML = htmlItems.join("");

  const total = calculateCartTotal(groupedItems);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  cartFooter.classList.remove("hide");

  attachQuantityEvents(rawCartItems);
}

function groupCartItems(items) {
  const grouped = {};
  items.forEach((item) => {
    const key = item.Id;
    if (!grouped[key]) {
      grouped[key] = { ...item, Quantity: 1 };
    } else {
      grouped[key].Quantity += 1;
    }
  });
  return Object.values(grouped);
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card enhanced-cart-card" data-id="${item.Id}">
      <div class="cart-card__image-wrapper">
        <a href="#" class="cart-card__image">
          <img src="${item.Image}" alt="${item.Name}" />
        </a>
      </div>
      <div class="cart-card__details">
        <a href="#">
          <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">Color: ${item.Colors?.[0]?.ColorName || "N/A"}</p>
        <div class="cart-card__controls">
          <div class="quantity-section">
            <button class="quantity-btn decrease-btn">–</button>
            <span class="cart-card__quantity">Qty: ${item.Quantity}</span>
            <button class="quantity-btn increase-btn">+</button>
          </div>
          <div class="price-section">
            <p class="cart-card__price">$${item.FinalPrice}</p>
          </div>
          <div class="delete-section">
            <button class="delete-btn">🗑 Remove</button>
          </div>
        </div>
      </div>
    </li>
  `;
}

function calculateCartTotal(items) {
  return items.reduce((sum, item) => {
    return sum + Number(item.FinalPrice) * item.Quantity;
  }, 0);
}

function attachQuantityEvents(rawCartItems) {
  const increaseButtons = document.querySelectorAll(".increase-btn");
  const decreaseButtons = document.querySelectorAll(".decrease-btn");
  const deleteButtons = document.querySelectorAll(".delete-btn");

  increaseButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = getItemId(e.target);
      const itemToAdd = rawCartItems.find((item) => item.Id === itemId);
      if (itemToAdd) {
        rawCartItems.push(itemToAdd);
        setLocalStorage("so-cart", rawCartItems);
        renderCartContents();
      }
    });
  });

  decreaseButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = getItemId(e.target);
      const index = rawCartItems.findIndex((item) => item.Id === itemId);
      if (index !== -1) {
        rawCartItems.splice(index, 1);
        setLocalStorage("so-cart", rawCartItems);
        renderCartContents();
      }
    });
  });

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = getItemId(e.target);
      const updatedCart = rawCartItems.filter((item) => item.Id !== itemId);
      setLocalStorage("so-cart", updatedCart);
      renderCartContents();
    });
  });
}

function getItemId(element) {
  return element.closest(".cart-card").getAttribute("data-id");
}

renderCartContents();
