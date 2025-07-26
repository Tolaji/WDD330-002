import {
  setLocalStorage,
  getLocalStorage,
  alertMessage,
  removeAllAlerts,
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }
  calculateItemSummary() {
     const totalElement = document.querySelector(`${this.outputSelector} #cartTotal`);
  const itemCountElement = document.querySelector(`${this.outputSelector} #num-items`);
  
  const totalItems = this.list.length;
  itemCountElement.textContent = totalItems;

  const totalAmount = this.list.reduce((acc, product) => acc + product.FinalPrice, 0);
  this.itemTotal = totalAmount;
  totalElement.textContent = `$${totalAmount}`;
  }
  calculateOrdertotal() {
  const extraShipping = (this.list.length - 1) * 2;
  this.shipping = 10 + extraShipping;

  const taxAmount = this.itemTotal * 0.06;
  this.tax = taxAmount.toFixed(2);

  const grandTotal = parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping);
  this.orderTotal = grandTotal.toFixed(2);

  this.displayOrderTotals();
  }
  displayOrderTotals() {
   const shippingField = document.querySelector(`${this.outputSelector} #shipping`);
  const taxField = document.querySelector(`${this.outputSelector} #tax`);
  const totalField = document.querySelector(`${this.outputSelector} #orderTotal`);

  shippingField.textContent = `$${this.shipping}`;
  taxField.textContent = `$${this.tax}`;
  totalField.textContent = `$${this.orderTotal}`;
  }
  async checkout() {
   const checkoutForm = document.forms["checkout"];
  const formData = formDataToJSON(checkoutForm);

  formData.orderDate = new Date();
  formData.orderTotal = this.orderTotal;
  formData.tax = this.tax;
  formData.shipping = this.shipping;
  formData.items = packageItems(this.list);

  try {
    const response = await services.checkout(formData);
    setLocalStorage("so-cart", []);
    location.assign("/checkout/success.html");
  } catch (error) {
    removeAllAlerts();
    for (const msg in error.message) {
      alertMessage(error.message[msg]);
    }
  }
}
}