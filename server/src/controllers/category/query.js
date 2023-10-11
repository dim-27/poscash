import AppError from "../../utils/app-error.js"
import Categories from "./repositories.js"

export default class QueryCategory {
  constructor() {
    this.category = new Categories()
  }

  async getCategories() {
    const params = {}
    const result = await this.category.findManyCategory(params)
    return result
  }

  async getCategoryById(categoryId) {
    const params = { id: categoryId }
    const result = await this.category.findOneCategory(params)
    return result
  }

  async getCategory(category) {
    const params = { category: category }
    const result = await this.category.findOneCategory(params)
    return result
  }
}
