import AppError from "../../utils/app-error.js"
import Categories from "./repositories.js"
import QueryCategory from "./query.js"

export default class CommandCategory {
  constructor() {
    this.Category = new Categories()
    this.query = new QueryCategory()
  }

  async addCategory(payload) {
    const { category } = payload
    const data = {
      category: category,
    }
    const checkCategory = await this.query.getCategory(category)

    if (checkCategory !== null)
      throw new AppError("Category has Already Added", 400)
    await this.Category.insertOneCategory(data)
  }
}
