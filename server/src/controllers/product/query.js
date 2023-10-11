import AppError from "../../utils/app-error.js"
import Products from "./repositories.js"

export default class QueryProduct {
  constructor() {
    this.product = new Products()
  }

  async getProducts() {
    const params = {}
    const result = await this.product.findManyProduct(params)
    return result
  }

  async getProductById(productId) {
    const params = { id: productId }
    const result = await this.product.findOneProduct(params)
    return result
  }

  async getProduct(product) {
    const params = { product: product }
    const result = await this.product.findOneProduct(params)
    return result
  }
}
