import { getParam } from './utils.mjs';
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');
const productId = getParam('product');

console.log('Loaded product ID from URL:', productId);

// Optional: test findProductById
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
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
    /* eslint-disable no-console */
    // for debugging purposes
    console.log("Before:", cartItems);
    cartItems.push(this.product);
    console.log("After:", cartItems);
    /* eslint-enable no-console */
    setLocalStorage("so-cart", cartItems);
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
  

// ************* Alternative Display Product Details Method *******************

// function productDetailsTemplate(product) {
//   document.querySelector('h2').textContent = product.Brand.Name;
//   document.querySelector('h3').textContent = product.NameWithoutBrand;

//   const productImage = document.getElementById('productImage');
//   productImage.src = product.Image;
//   productImage.alt = product.NameWithoutBrand;

//   document.getElementById('productPrice').textContent = product.FinalPrice;
//   document.getElementById('productColor').textContent = product.Colors[0].ColorName;
//   document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

//   document.getElementById('addToCart').dataset.id = product.Id;
// }

// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }
  