import { getParam } from './utils.mjs';
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from './ProductData.mjs';
import { updateCartCount } from "./utils.mjs";

const dataSource = new ProductData('tents');
const productId = getParam('product');

console.log('Loaded product ID from URL:', productId);

dataSource.findProductById(productId).then(product => {
  console.log('Product data:', product);
});

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    this.addToCart(this.product);
    updateCartCount(); // if you're tracking cart count elsewhere
  }

  addToCart(product) {
    const cart = getLocalStorage("so-cart") || [];

    // Find item by ID
    const existingItem = cart.find(item => item.Id === product.Id);

    if (existingItem) {
      // Increase quantity and total price
      existingItem.Quantity = (existingItem.Quantity || 1) + 1;
    } else {
      // New item with Quantity 1
      product.Quantity = 1;
      cart.push(product);
    }

    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector(".product-detail h3").textContent = product.Brand.Name;
  document.querySelector(".product-detail h2").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector(".product-detail img.divider");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.querySelector(".product-card__price").textContent = `$${product.FinalPrice}`;
  document.querySelector(".product__color").textContent = product.Colors[0].ColorName;
  document.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}
