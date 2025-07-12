import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// To add a product to the cart, we need to append products to the existing array of products.
function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array

  // Find existing product
  const existingItem = cartItems.find((item) => item.Id === product.Id);


  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }

  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
