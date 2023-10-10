import AppError from "../../utils/app-error.js";
import CategoryProducts from "./repositories.js";
import QueryCategoryProduct from "./query.js";

export default class CommandCategoryProduct {
  constructor() {
    this.categoryProduct = new CategoryProducts();
    this.query = new QueryCategoryProduct();
  }

  async addCategoryProduct(payload) {
    const { productId, categoryId } = payload;
    const data = {
      productId: productId,
      categoryId: categoryId,
    };
    await this.categoryProduct.insertOneCategoryProduct(data);
  }

  async deleteCategoryProduct(categoryProductId) {
    const params = { where: { id: categoryProductId } };
    await this.categoryProduct.deleteOneCategoryProduct(params);
  }
}
