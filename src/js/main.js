import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount, getParam } from "./utils.mjs";
import Alert from "./alert.js";

// locates the root index.html file and renders the alert there
if (window.location.pathname === "/index.html") {
  const alert = new Alert("/json/alerts.json");
  alert.render(document.querySelector("main"));
}

// locates the root index.html file and renders the alert there
if (window.location.pathname === "/index.html") {
  const alert = new Alert("/json/alerts.json");
  alert.render(document.querySelector("main"));
}


const category = getParam("product");
const dataSource = new ProductData(category);
const listElement = document.querySelector(".product-list");
const cartCount = document.getElementById("cart-count");

// Initialize the product list with the category, data source, and list element
const productList = new ProductList(category, dataSource, listElement);
productList.init();

// Update the cart count on page load
updateCartCount(cartCount);
