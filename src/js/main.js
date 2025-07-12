import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";


const dataSource = new ProductData("tents");

const listElement = document.querySelector(".product-list");

const myProducttList = new ProductList("tents", dataSource, listElement);

myProducttList.init();
