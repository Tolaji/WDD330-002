import ProductData from "./ProductData.mjs";
import ProductList from "./CategoryList.mjs";
import { updateCartCount, loadHeaderFooter, getParam  } from "./utils.mjs";

const category = getParam("product");
const dataSource = new ProductData(category);
const listElement = document.querySelector(".product-list");
const cartCount = document.getElementById("cart-count");

// Initialize the product list with the category, data source, and list element
const productList = new ProductList(category, dataSource, listElement);
productList.init();

// Update the cart count on page load
updateCartCount(cartCount);
