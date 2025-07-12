import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.roduct = {};
    }


    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        document.getElementById('addToCart').addEventListener('click', this.addProductToCart.bind(this));
    }

    renderProductDetails() {
        if (!this.product) return;

        document.querySelector('.product-detail_brand').textContent = this.product.Brand.Name;
        document.querySelector('.product-detail_name').textContent = this.product.NameWithoutBrand;
        document.querySelector('.product-detail_image').src = this.product.Image;
        document.querySelector('.product-detail_image').alt = this.product.Name;
        document.querySelector('.product-card__price').textContent = `$${this.product.ListPrice}`;
        document.querySelector('.product__color').textContent = this.product.Colors.ColorName;
        document.querySelector('.product__description').textContent = this.product.Description;
    }
    
    addProductToCart() {
        let cartItems = getLocalStorage('so-cart') || [];
        cartItems.push(this.product);
        setLocalStorage('so-cart', cartItems);
    }
}