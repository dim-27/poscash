import AppError from "../../utils/app-error.js"
import Categories from "./repositories.js"

export default class QueryCategory {
  constructor() {
    this.category = new Categories()
  }

  async getCategories() {
    const params = {}
    const result = await this.category.findManyCategory(params)
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result
  }

  async getCategoryById(categoryId) {
    const params = { where: { id: categoryId } }
    const result = await this.category.findOneCategory(params)
    // if (result === null) throw new AppError("Category not Found", 404);
    return result
  }
}
