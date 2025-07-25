// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}


// retrieve data from localstorage safely
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error(`❌ Failed to parse localStorage key: ${key}`, e);
    return [];
  }
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
  const totalCount = cartItems.reduce((sum, item) => sum + (Number(item.Quantity) || 1), 0);

  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalCount;
    cartCountElement.style.display = totalCount > 0 ? "inline-block" : "none";
  }
}

export function loadHeaderFooter() {
  const header = fetch("/partials/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("main-header").innerHTML = data;
    });

  const footer = fetch("/partials/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("main-footer").innerHTML = data;
    });

  // After both header and footer load, update cart count
  Promise.all([header, footer]).then(() => {
    updateCartCount();
  });
}


