import AppError from "../../utils/app-error.js";
import CategoryProducts from "./repositories.js";

export default class QueryCategoryProduct {
  constructor() {
    this.categoryProduct = new CategoryProducts();
  }

  async getCategoryProducts() {
    const params = {};
    const result = await this.categoryProduct.findManyCategoryProduct(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result;
  }

  async getCategoryProductById(categoryProductId) {
    const params = { where: { id: categoryProductId } };
    const result = await this.categoryProduct.findOneCategoryProduct(params);
    // if (result === null) throw new AppError("CategoryProduct not Found", 404);
    return result;
  }
}
