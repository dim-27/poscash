import Admin from "../../models/admin.js";

export default class Admins {
  async findManyAdmin(params) {
    const result = await Admin.findAll(params);
    return result;
  }

  async findOneAdmin(params) {
    const result = await Admin.findOne(params);
    return result;
  }

  async insertOneAdmin(data) {
    const result = await Admin.create(data);
    return result;
  }

  async updateOneAdmin(data, params) {
    const result = await Admin.update(data, params);
    return result;
  }

  async deleteOneAdmin(params) {
    const result = await Admin.destroy(params);
    return result;
  }
}
