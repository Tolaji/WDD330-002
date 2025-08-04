import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", () => checkout.calculateOrderTotal());

document
  .querySelector("#checkout-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const result = await checkout.checkout(e.target);
    console.log("Server response:", result);
    // Redirect or show confirmation message
  });
