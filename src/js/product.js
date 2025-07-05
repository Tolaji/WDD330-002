import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

async function addProductToCart(product) {
  const listProducts = await getLocalStorage("so-cart");

  let cart = [];

  try {
    cart = listProducts ? JSON.parse(listProducts) : [];
  } catch (e) {
    console.error("Error ain parse localStorage:", e);
    cart = [];
  }

  console.log("current cart:", cart);

  cart.push(product);

  setLocalStorage("so-cart", JSON.stringify(cart));
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
