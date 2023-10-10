import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import schema from "./schema.js";
import QueryProduct from "./query.js";
import CommandProduct from "./command.js";

const query = new QueryProduct();
const command = new CommandProduct();

const getProducts = tryCatch(async (req, res) => {
  const response = await query.getProducts();
  return utils.responseSuccess(res, response);
});

const getProductById = tryCatch(async (req, res) => {
  const params = req.params.productId;
  const response = await query.getProductById(params);
  return utils.responseSuccess(res, response);
});

const addProduct = tryCatch(async (req, res) => {
  const payload = req.body;
  console.log(payload);
  await utils.validateSchema(payload, schema.addProduct);
  const response = await command.addProduct(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const updateProduct = tryCatch(async (req, res) => {
  const params = req.params.productId;
  const payload = req.body;
  const response = await command.updateProduct(payload, params);
  return utils.responseSuccess(res, response);
});

const deleteProduct = tryCatch(async (req, res) => {
  const params = req.params.productId;
  const response = await command.deleteProduct(params);
  return utils.responseSuccess(res, response);
});

export default {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
