import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import schema from "./schema.js";
import QueryRole from "./query.js";
import CommandRole from "./command.js";

const query = new QueryRole();
const command = new CommandRole();

const getRoles = tryCatch(async (req, res) => {
  const response = await query.getRoles();
  return utils.responseSuccess(res, response);
});

const getRoleById = tryCatch(async (req, res) => {
  const params = req.params.roleId;
  const response = await query.getRoleById(params);
  return utils.responseSuccess(res, response);
});

const addRole = tryCatch(async (req, res) => {
  const payload = req.body;
  console.log(payload);
  await utils.validateSchema(payload, schema.addRole);
  const response = await command.addRole(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const updateRole = tryCatch(async (req, res) => {
  const params = req.params.roleId;
  const payload = req.body;
  const response = await command.updateRole(payload, params);
  return utils.responseSuccess(res, response);
});

const deleteRole = tryCatch(async (req, res) => {
  const params = req.params.roleId;
  const response = await command.deleteRole(params);
  return utils.responseSuccess(res, response);
});

export default {
  getRoles,
  getRoleById,
  addRole,
  updateRole,
  deleteRole,
};
