import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, updateCartCount, getParam } from "./utils.mjs";
// import Alert from "./alert.js";

document.addEventListener("DOMContentLoaded", async () => {
  const category = getParam("category");
  const dataSource = new ProductData();
  const listElement = document.querySelector(".product-list");

  // Check if the listElement exists before proceeding
  // If it doesn't exist, log an error and return early to prevent further errors
  if (!listElement) {
    console.error("Error: Could not find .product-list element");
    return;
  }

  // Initialize an instance of the product list with the category, data source, and list element
  const productList = new ProductList(category, dataSource, listElement);
  await productList.init();

  const cartCount = document.getElementById("cart-count");

  // Update the cart count on page load
  updateCartCount(cartCount);

  // Load the header and footer
  loadHeaderFooter();
});
