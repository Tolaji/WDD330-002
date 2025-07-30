// function convertToJson(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error("Bad Response");
//   }
// }

// export default class ProductData {
//   constructor(category) {
//     this.category = category;
//     this.path = `../json/${this.category}.json`;
//   }
//   getData() {
//     return fetch(this.path)
//       .then(convertToJson)
//       .then((data) => data);
//   }
//   async findProductById(id) {
//     const products = await this.getData();
//     return products.find((item) => item.Id === id);
//   }
// }

const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  // Constructor no longer needs category or path
  constructor() {}

  // getData now takes category as a parameter and uses async/await
  async getData(category) {
    const response = await fetch(`${baseURL}/products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result; // API returns { Result: [...] }
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}/product/${id}`);
    const data = await convertToJson(response);
    return data.Result; // API returns { Result: [...] }
  }
}
