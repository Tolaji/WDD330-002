import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";

const category = "tents";
const dataSource = new ProductData(category);
const listElement = document.querySelector(".product-list");
const cartCount = document.getElementById("cart-count");

// Initialize the product list with the category, data source, and list element
const productList = new ProductList(category, dataSource, listElement);
productList.init();

// Update the cart count on page load
updateCartCount(cartCount);
