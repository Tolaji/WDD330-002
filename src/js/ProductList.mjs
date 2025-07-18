import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
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
        <a href="product_pages/index.html?product=${product.Id}">
          <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
          <h2 class="card__brand">${product.Brand.Name}</h2>
          <h3 class="card__name">${product.NameWithoutBrand}</h3>
          <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
      </li>
    `;
  }

}
