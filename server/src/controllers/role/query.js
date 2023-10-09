import AppError from "../../utils/app-error.js";
import Roles from "./repositories.js";

export default class QueryRole {
  constructor() {
    this.role = new Roles();
  }

  async getRoles() {
    const params = {};
    const result = await this.role.findManyRole(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result;
  }

  async getRoleById(roleId) {
    const params = { id: roleId };
    const result = await this.role.findOneRole(params);
    // if (result === null) throw new AppError("Role not Found", 404);
    return result;
  }

  async getRole(role) {
    const params = { role: role };
    const result = await this.role.findOneRole(params);
    // if (result === null) throw new AppError("Role not Found", 404);
    return result;
  }
}
