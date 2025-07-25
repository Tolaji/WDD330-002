export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemCount = 0;
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.total = 0;
  }

  init() {
    this.list = JSON.parse(localStorage.getItem(this.key));
    this.calculateItemSummary();
    this.calculateOrdertotals();
  }

  calculateItemSummary() {
    // Calculate subtotal and item count
    this.itemCount = 0;
    this.subtotal = 0;

    this.list.forEach((item) => {
      this.itemCount += item.quantity;
      this.subtotal += item.FinalPrice * item.quantity;
    });

    // Update the display
    document.querySelector("#order-subtotal").innerHTML = `$${this.subtotal.toFixed(2)}`;
  }

  calculateOrdertotals() {
    // Calculate tax (6%)
    this.tax = this.subtotal * 0.06;

    // Calculate shipping ($10 first item, $2 each additional)
    this.shipping = 10 + (this.itemCount - 1) * 2;

    // Calculate total
    this.total = this.subtotal + this.tax + this.shipping;

    // Update the display
    document.querySelector("#order-tax").innerHTML = `$${this.tax.toFixed(2)}`;
    document.querySelector("#order-shipping").innerHTML = `$${this.shipping.toFixed(2)}`;
    document.querySelector("#order-total").innerHTML = `$${this.total.toFixed(2)}`;
  }

  // Call this when zip code is entered
  updateOnZipCode() {
    this.calculateOrdertotals();
  }
}
