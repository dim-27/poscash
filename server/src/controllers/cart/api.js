import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import QueryCart from "./query.js";
import CommandCart from "./command.js";

const query = new QueryCart();
const command = new CommandCart();

const getCarts = tryCatch(async (req, res) => {
  const response = await query.getCarts();
  return utils.responseSuccess(res, response);
});

const getCartById = tryCatch(async (req, res) => {
  const params = req.params.cartId;
  const response = await query.getCartById(params);
  return utils.responseSuccess(res, response);
});

const getCartByUserId = tryCatch(async (req, res) => {
  const params = req.params.userId;
  console.log(params);
  const response = await query.getCartByUserId(params);
  return utils.responseSuccess(res, response);
});

const addCart = tryCatch(async (req, res) => {
  const payload = req.body;
  const response = await command.addCart(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const increaseQuantity = tryCatch(async (req, res) => {
  const payload = req.body;
  const response = await command.increaseQuantity(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const decreaseQuantity = tryCatch(async (req, res) => {
  const payload = req.body;
  const response = await command.decreaseQuantity(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const deleteCartItem = tryCatch(async (req, res) => {
  const payload = req.body;
  const response = await command.deleteCartItem(payload);
  return utils.responseSuccess(res, response);
});

const deleteCart = tryCatch(async (req, res) => {
  const params = req.params.cartId;
  const response = await command.deleteCart(params);
  return utils.responseSuccess(res, response);
});

export default {
  getCarts,
  getCartById,
  getCartByUserId,
  addCart,
  increaseQuantity,
  decreaseQuantity,
  deleteCartItem,
  deleteCart,
};
