import AppError from "../../utils/app-error.js";
import Products from "./repositories.js";

export default class QueryProduct {
  constructor() {
    this.product = new Products();
  }

  async getProducts() {
    const params = {};
    const result = await this.product.findManyProduct(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result;
  }

  async getProductById(productId) {
    const params = { where: { id: productId } };
    const result = await this.product.findOneProduct(params);
    // if (result === null) throw new AppError("Product not Found", 404);
    return result;
  }
}
