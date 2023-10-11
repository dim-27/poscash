import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import schema from "./schema.js";
import QueryUser from "./query.js";
import CommandUser from "./command.js";

const query = new QueryUser();
const command = new CommandUser();

const getUsers = tryCatch(async (req, res) => {
  const response = await query.getUsers();
  return utils.responseSuccess(res, response);
});

const getUserById = tryCatch(async (req, res) => {
  const params = req.params.userId;
  const response = await query.getUserById(params);
  return utils.responseSuccess(res, response);
});

const register = tryCatch(async (req, res) => {
  const payload = req.body;
  await utils.validateSchema(payload, schema.register);
  const response = await command.register(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const login = tryCatch(async (req, res) => {
  const payload = req.body;
  await utils.validateSchema(payload, schema.login);
  const response = await command.login(payload);
  return utils.responseSuccess(res, response);
});

const updateUser = tryCatch(async (req, res) => {
  const params = req.params.userId;
  const payload = req.body;
  const response = await command.updateUser(payload, params);
  return utils.responseSuccess(res, response);
});

const resetPassword = tryCatch(async (req, res) => {
  const payload = req.body;
  const response = await command.resetPassword(payload);
  return utils.responseSuccess(res, response);
});

const deleteUser = tryCatch(async (req, res) => {
  const params = req.params.userId;
  const response = await command.deleteUser(params);
  return utils.responseSuccess(res, response);
});

export default {
  getUsers,
  getUserById,
  register,
  login,
  updateUser,
  resetPassword,
  deleteUser,
};
