import { renderListWithTemplate } from "./utils.mjs";
const listMenu = [
    {
        name: "Tents",
        route: "tents",
        image: "../category-tents.svg",
        alt: "Tents Category"
    },
    {
        name: "Backpacks",
        route: "backpacks",
        image: "../category-backpacks.svg",
        alt: "Backpacks Category"
    },
    {
        name: "Sleeping Bags",
        route: "sleeping-bags",
        image: "../category-sleepingbags.svg",
        alt: "Sleeping Bags Category"
    },
    {
        name: "Hammocks",
        route: "hammocks",
        image: "../category-hammocks.svg",
        alt: "Hammocks Category"
    }
]
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  
  async init() {
  const list = listMenu;
  console.log("que estamos recibiendo", list);
    this.renderList(list);
  }

  // renderList(list) {
  // const htmlStrings = list.map(productCardTemplate);
  // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
  // }

  // renderList(list) {
  //   const htmlList = list.map(product => this.productCardTemplate(product)).join("");
  //   this.listElement.innerHTML = htmlList;
  // }

   renderList(list) {
    renderListWithTemplate(this.productCardTemplate, this.listElement, list, "afterbegin", true);
  }

  

  // productCardTemplate(product) {
  //   const template = `
  //     <li class="product-card">
  //       <a href="product_pages/index.html?product=${product.Id}">
  //         <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
  //         <h2 class="card__brand">${product.Brand.Name}</h2>
  //         <h3 class="card__name">${product.NameWithoutBrand}</h3>
  //         <p class="product-card__price">$${product.FinalPrice}</p>
  //       </a>
  //     </li>
  //   `;
  //   return template;
  // }

  productCardTemplate(product) {
    return `
      <li class="product-card">
        <a href="product_pages/index.html?product=${product.route}">
          <img src="${product.image}" alt="${product.alt}" />
          <Center><h3 class="card__name">${product.name}</h3></Center>
        </a>
      </li>
    `;
  }

}
