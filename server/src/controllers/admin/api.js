import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import schema from "./schema.js";
import QueryAdmin from "./query.js";
import CommandAdmin from "./command.js";

const query = new QueryAdmin();
const command = new CommandAdmin();

const getAdmins = tryCatch(async (req, res) => {
  const response = await query.getAdmins();
  return utils.responseSuccess(res, response);
});

const getAdminById = tryCatch(async (req, res) => {
  const params = req.params.adminId;
  const response = await query.getAdminById(params);
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

const updateAdmin = tryCatch(async (req, res) => {
  const params = req.params.adminId;
  const payload = req.body;
  const response = await query.updateAdmin(payload, params);
  return utils.responseSuccess(res, response);
});

const resetPassword = tryCatch(async (req, res) => {
  const payload = req.body;
  const response = await command.resetPassword(payload);
  return utils.responseSuccess(res, response);
});

const deleteAdmin = tryCatch(async (req, res) => {
  const params = req.params.adminId;
  const response = await query.deleteAdmin(params);
  return utils.responseSuccess(res, response);
});

export default {
  getAdmins,
  getAdminById,
  register,
  login,
  updateAdmin,
  resetPassword,
  deleteAdmin,
};
