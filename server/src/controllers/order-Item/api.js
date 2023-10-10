import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import QueryOrderItem from "./query.js";
import CommandOrderItem from "./command.js";

const query = new QueryOrderItem();
const command = new CommandOrderItem();

const getOrderItems = tryCatch(async (req, res) => {
  const response = await query.getOrderItems();
  return utils.responseSuccess(res, response);
});

const getOrderItemById = tryCatch(async (req, res) => {
  const params = req.params.orderItemId;
  const response = await query.getOrderItemById(params);
  return utils.responseSuccess(res, response);
});

const addOrderItem = tryCatch(async (req, res) => {
  const payload = req.body;
  const response = await command.addOrderItem(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const deleteOrderItem = tryCatch(async (req, res) => {
  const params = req.params.orderItemId;
  const response = await command.deleteOrderItem(params);
  return utils.responseSuccess(res, response);
});

export default {
  getOrderItems,
  getOrderItemById,
  addOrderItem,
  deleteOrderItem,
};
