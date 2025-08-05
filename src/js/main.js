import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam, updateCartCount } from "./utils.mjs";
import Alert from "./alert.js";

// Get category from URL or default to "tents"
const category = getParam("category") || "tents";

// Locates the root index.html file and renders the alert there
if (window.location.pathname === "/index.html") {
  const alert = new Alert("/json/alerts.json");
  alert.render(document.querySelector("main"));
}

const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const cartCount = document.getElementById("cart-count");

// Update page title with category - using more specific selector
const titleElement = document.querySelector(".products h2");
if (titleElement) {
  titleElement.textContent = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
}

// Initialize the product list with the category, data source, and list element
const productList = new ProductList(category, dataSource, listElement);
productList.init();

// Update the cart count on page load
updateCartCount(cartCount);

// Load the header and footer
loadHeaderFooter();
