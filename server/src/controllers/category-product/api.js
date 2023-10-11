import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import QueryCategoryProduct from "./query.js";
import CommandCategoryProduct from "./command.js";

const query = new QueryCategoryProduct();
const command = new CommandCategoryProduct();

const getCategoryProducts = tryCatch(async (req, res) => {
  const response = await query.getCategoryProducts();
  return utils.responseSuccess(res, response);
});

const getCategoryProductById = tryCatch(async (req, res) => {
  const params = req.params.categoryProductId;
  const response = await query.getCategoryProductById(params);
  return utils.responseSuccess(res, response);
});

const addCategoryProduct = tryCatch(async (req, res) => {
  const payload = req.body;
  const response = await command.addCategoryProduct(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const deleteCategoryProduct = tryCatch(async (req, res) => {
  const params = req.params.categoryProductId;
  const response = await command.deleteCategoryProduct(params);
  return utils.responseSuccess(res, response);
});

export default {
  getCategoryProducts,
  getCategoryProductById,
  addCategoryProduct,
  deleteCategoryProduct,
};
