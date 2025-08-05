const baseURL = import.meta.env.VITE_SERVER_URL || "https://wdd330-backend.onrender.com/checkout";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
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

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    const response = await fetch(`${baseURL}/checkout`, options);
    return await convertToJson(response);
  }
}
