import AppError from "../../utils/app-error.js"
import Products from "./repositories.js"
import QueryProduct from "./query.js"

export default class CommandProduct {
  constructor() {
    this.Product = new Products()
    this.query = new QueryProduct()
  }

  async addProduct(payload) {
    const { product } = payload
    const data = {
      product: product,
    }
    const checkProduct = await this.query.getProduct(product)

    if (checkProduct !== null) throw new AppError("Product has Already", 400)
    await this.Product.insertOneProduct(data)
  }
}
