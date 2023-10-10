import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import QueryOrder from "./query.js";
import CommandOrder from "./command.js";

const query = new QueryOrder();
const command = new CommandOrder();

const getOrders = tryCatch(async (req, res) => {
  const response = await query.getOrders();
  return utils.responseSuccess(res, response);
});

const getOrderById = tryCatch(async (req, res) => {
  const params = req.params.orderId;
  const response = await query.getOrderById(params);
  return utils.responseSuccess(res, response);
});

const addOrder = tryCatch(async (req, res) => {
  const payload = req.body;
  const response = await command.addOrder(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const deleteOrder = tryCatch(async (req, res) => {
  const params = req.params.orderId;
  const response = await command.deleteOrder(params);
  return utils.responseSuccess(res, response);
});

export default {
  getOrders,
  getOrderById,
  addOrder,
  deleteOrder,
};
