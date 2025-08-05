import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}



// Export the CheckoutProcess class as the default export of the module
export default class CheckoutProcess {
  // Constructor method to initialize the CheckoutProcess class
  constructor(key, outputSelector) {
    // Set the key and outputSelector properties
    this.key = key;
    this.outputSelector = outputSelector;
    // Initialize the list, itemTotal, shipping, tax, and orderTotal properties
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    // Create an instance of the ExternalServices class
    this.services = new ExternalServices();
  }

  // Method to initialize the CheckoutProcess class
  init() {
    // Get the list from local storage or initialize it to an empty array
    this.list = getLocalStorage(this.key) || [];
    // Calculate the item sub total
    this.calculateItemSubTotal();
  }

  // Method to calculate the item sub total
  calculateItemSubTotal() {
    // Calculate the item total by summing the final price of each item multiplied by its quantity
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * item.quantity,
      0
    );
    // Set the text content of the subtotal element to the item total
    document.querySelector(`${this.outputSelector} #subtotal`).textContent = this.itemTotal.toFixed(2);
  }

  // Method to calculate the order total
  calculateOrderTotal() {
    // Calculate the tax by multiplying the item total by 6%
    this.tax = this.itemTotal * 0.06;
    // Calculate the item count by summing the quantity of each item
    const itemCount = this.list.reduce((sum, item) => sum + item.quantity, 0);
    // Calculate the shipping by adding $10 for the first item and $2 for each additional item
    this.shipping = 10 + (itemCount > 1 ? (itemCount - 1) * 2 : 0);
    // Calculate the order total by adding the item total, tax, and shipping
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    // Display the order totals
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(`${this.outputSelector} #tax`).textContent = this.tax.toFixed(2);
    // Set the text content of the tax, shipping, and order total elements to their respective values
    document.querySelector(`${this.outputSelector} #shipping`).textContent = this.shipping.toFixed(2);
    document.querySelector(`${this.outputSelector} #orderTotal`).textContent = this.orderTotal.toFixed(2);
  }

  packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: Number(item.FinalPrice),
      quantity: item.quantity,
    }));
  }

  async checkout(form) {
  // Method to process the checkout
    try {
      const formData = formDataToJSON(form);
      // Convert the form data to JSON
      formData.orderDate = new Date().toISOString();
      // Set the order date to the current date and time
      formData.items = this.packageItems(this.list);
      // Set the items to the packaged items
      formData.orderTotal = this.orderTotal;
      // Set the order total, tax, and shipping
      formData.tax = this.tax.toFixed(2);
      formData.shipping = this.shipping;

      const response = await this.services.checkout(formData);
      
      // Success: clear cart and redirect
      setLocalStorage(this.key, []);
      window.location.href = "/checkout/success.html";
      alertMessage("Order placed successfully!", false);

    } catch (err) {
      console.error("Checkout Error:", err);
      console.log("Server said:", err.message);
      const errorMsg = typeof err.message === "string" ? err.message : err.message.message;
      alertMessage(`Checkout failed: ${errorMsg}`, true);

    }
  }
  
}


