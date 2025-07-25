import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";
import Alert from "./alert.js";


//load partials dynamically
import { loadHeaderFooter } from "./utils.mjs"; // Assuming you make this function

loadHeaderFooter();

// locates the root index.html file and renders the alert there
if (window.location.pathname === "/index.html") {
  const alert = new Alert("/json/alerts.json");
  alert.render(document.querySelector("main"));
}

const category = "tents";
const dataSource = new ProductData(category);
const listElement = document.querySelector(".product-list");
//const cartCount = document.getElementById("cart-count");

// Initialize the product list with the category, data source, and list element
const productList = new ProductList(category, dataSource, listElement);
productList.init();

// Update the cart count on page load
updateCartCount();

