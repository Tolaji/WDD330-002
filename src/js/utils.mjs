// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (!parentElement) throw new Error("No parent element provided to renderListWithTemplate.");

  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFn);
  const combinedHtml = htmlStrings.join("");
  parentElement.insertAdjacentHTML(position, combinedHtml);
}

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? "inline-block" : "none";
  }
}


export function renderWithTemplate(template, parentElement, data, callback) {
  // parentElement.innerHTML = template;
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) callback(data);
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  return await res.text();
}

export async function loadHeaderFooter() {
  const header = await loadTemplate("/partials/header.html");
  const footer = await loadTemplate("/partials/footer.html");

  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");

  renderWithTemplate(header, headerElement, null, updateCartCount); // cart count updater callback
  renderWithTemplate(footer, footerElement);
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span class="close">✖</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.classList.contains("close")) {
      alert.remove();
    }
  });

  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);
}


