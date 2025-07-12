import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Configuración inicial
const dataSource = new ProductData("tents");
const productId = new URLSearchParams(window.location.search).get("product");

// Crea y ejecuta el controlador de vista de producto
const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();