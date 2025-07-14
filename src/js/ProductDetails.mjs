import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      console.log("Producto cargado:", this.product);
      this.renderProductDetails();

      document
        .getElementById("addToCart")
        .addEventListener("click", this.addProductToCart.bind(this));
    } catch (error) {
      console.error("Error loading product details:", error);
    }
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    console.log("Product added to cart:", this.product);
  }

  renderProductDetails() {
    document.querySelector(".product-brand").textContent = this.product.Brand?.Name || "Sin marca";
    document.querySelector(".product-name").textContent = this.product.Name;
    document.querySelector(".product-image").src = this.product.Image;
    document.querySelector(".product-image").alt = this.product.Name;
    document.querySelector(".product-price").textContent = `$${this.product.FinalPrice}`;
    document.querySelector(".product__color").textContent = this.product.Colors.map(c => c.ColorName).join(", ");
    document.querySelector(".product-description").innerHTML = this.product.DescriptionHtmlSimple;
    document.getElementById("addToCart").dataset.id = this.product.Id;
    console.log("product details rendered",this.product.Id);
    console.log("product details rendered",this.product.Name);
    console.log("product details rendered",this.product.DescriptionHtmlSimple);

  }
}
