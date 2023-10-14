import Role from "../../models/role.js";
import User from "../../models/user.js";

Role.hasMany(User);

export default class Roles {
  async findManyRole(params) {
    const result = await Role.findAll(params);
    return result;
  }

  async findOneRole(params) {
    const result = await Role.findOne(params);
    return result;
  }

  async insertOneRole(data) {
    const result = await Role.create(data);
    return result;
  }

  async insertManyRole(data) {
    const result = await Role.bulkCreate(data);
    return result;
  }

  async updateOneRole(data, params) {
    const result = await Role.update(data, params);
    return result;
  }

  async deleteOneRole(params) {
    const result = await Role.destroy(params);
    return result;
  }
}
