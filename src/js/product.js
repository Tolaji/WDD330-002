import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  if (!product) return; // Prevent adding undefined
  const localstore = getLocalStorage("so-cart") || [];
  localstore.push(product);
  setLocalStorage("so-cart", localstore);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const button = e.currentTarget;
  const productId = button.dataset.id;
  if (!productId) return; // Prevent errors if no data-id
  const product = await dataSource.findProductById(productId);
  addProductToCart(product);
}

// Wait for DOM to be ready before adding event listener
document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.getElementById("addToCart");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", addToCartHandler);
  }
});
