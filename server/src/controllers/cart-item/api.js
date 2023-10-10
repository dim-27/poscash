import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import QueryCartItem from "./query.js";
import CommandCartItem from "./command.js";

const query = new QueryCartItem();
const command = new CommandCartItem();

const getCartItems = tryCatch(async (req, res) => {
  const response = await query.getCartItems();
  return utils.responseSuccess(res, response);
});

const getCartItemById = tryCatch(async (req, res) => {
  const params = req.params.CartItemId;
  const response = await query.getCartItemById(params);
  return utils.responseSuccess(res, response);
});

const addCartItem = tryCatch(async (req, res) => {
  const payload = req.body;
  const response = await command.addCartItem(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const deleteCartItem = tryCatch(async (req, res) => {
  const params = req.params.CartItemId;
  const response = await command.deleteCartItem(params);
  return utils.responseSuccess(res, response);
});

export default {
  getCartItems,
  getCartItemById,
  addCartItem,
  deleteCartItem,
};
