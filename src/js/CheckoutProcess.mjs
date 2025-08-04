import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: Number(item.FinalPrice),
    quantity: item.quantity,
  }));
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
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * item.quantity,
      0
    );
    document.querySelector(`${this.outputSelector} #subtotal`).textContent = this.itemTotal.toFixed(2);
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    const itemCount = this.list.reduce((sum, item) => sum + item.quantity, 0);
    this.shipping = 10 + (itemCount > 1 ? (itemCount - 1) * 2 : 0);
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(`${this.outputSelector} #tax`).textContent = this.tax.toFixed(2);
    document.querySelector(`${this.outputSelector} #shipping`).textContent = this.shipping.toFixed(2);
    document.querySelector(`${this.outputSelector} #orderTotal`).textContent = this.orderTotal.toFixed(2);
  }

  async checkout(form) {
    const orderData = formDataToJSON(form);
    orderData.orderDate = new Date().toISOString();
    orderData.orderTotal = this.orderTotal.toFixed(2);
    orderData.tax = this.tax.toFixed(2);
    orderData.shipping = this.shipping;
    orderData.items = packageItems(this.list);

    const service = new ExternalServices();
    const result = await service.checkout(orderData);
    return result;
  }
  
}


