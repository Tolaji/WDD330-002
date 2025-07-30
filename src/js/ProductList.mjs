import { renderListWithTemplate, loadHeaderFooter } from "./utils.mjs";


export default class ProductList {
  constructor(category, dataSource, listElement) {
    if (!listElement) throw new Error("No list element provided");
    this.category = category;
    this.dataSource = dataSource;
    // this.dataSource.getData(this.category);
    this.listElement = listElement;
  }

  async init() {
    try{
    // const list = await this.dataSource.getData();
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    } catch (error) {
      console.error("Error initializing product list:", error);
    }
  }

   renderList(list) {
    renderListWithTemplate(this.productCardTemplate, this.listElement, list, "afterbegin", true);
  }

  productCardTemplate(product) {
    return `
      <li class="product-card">
        <a href="/product_pages/index.html?product=${product.Id}">
          <img src="${product.Images.PrimaryMedium}" alt="${product.NameWithoutBrand}" />
          <h2 class="card__brand">${product.Brand.Name}</h2>
          <h3 class="card__name">${product.NameWithoutBrand}</h3>
          <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
      </li>
    `;
  }

}
