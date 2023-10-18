import tryCatch from "../../utils/try-catch.js"
import utils from "../../utils/utils.js"
import QueryCategory from "./query.js"
import CommandCategory from "./command.js"

const query = new QueryCategory()
const command = new CommandCategory()

const getCategories = tryCatch(async (req, res) => {
  const response = await query.getCategories()
  return utils.responseSuccess(res, response)
})

const getCategoryById = tryCatch(async (req, res) => {
  const params = req.params.categoryId
  const response = await query.getCategoryById(params)
  return utils.responseSuccess(res, response)
})

const addCategory = tryCatch(async (req, res) => {
  const payload = req.body
  const response = await command.addCategory(payload)
  return utils.responseSuccess(res, response, "Success", 201)
})

const updateCategory = tryCatch(async (req, res) => {
  const params = req.params.categoryId
  const payload = req.body
  const response = await command.updateCategory(payload, params)
  return utils.responseSuccess(res, response, "Success", 201)
})

const deleteCategory = tryCatch(async (req, res) => {
  const params = req.params.categoryId
  const response = await command.deleteCategory(params)
  return utils.responseSuccess(res, response)
})

export default {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
}
