import AppError from "../../utils/app-error.js"
import Products from "./repositories.js"
import Category from "../../models/category.js"

export default class QueryProduct {
  constructor() {
    this.product = new Products()
  }

  async getProducts() {
    const params = { include: [{ model: Category }] }
    const result = await this.product.findManyProduct(params)
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result
  }

  async getProductById(productId) {
    const params = { include: { model: Category }, where: { id: productId } }
    const result = await this.product.findOneProduct(params)
    // if (result === null) throw new AppError("Product not Found", 404);
    return result
  }

  async getProductByName(name) {
    const params = { where: { name: name } }
    const result = await this.product.findOneProduct(params)
    // if (result === null) throw new AppError("Product not Found", 404);
    return result
  }

  async getAllProductByCategoryId(categoryId) {
    const params = {
      include: { model: Category },
      where: { categoryId: categoryId },
    }
    const result = await this.product.findManyProduct(params)
    // if (result === null) throw new AppError("Product not Found", 404);
    return result
  }
}
