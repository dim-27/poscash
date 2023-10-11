import AppError from "../../utils/app-error.js";
import Admins from "./repositories.js";

export default class QueryAdmin {
  constructor() {
    this.admin = new Admins();
  }

  async getAdmins() {
    const params = {};
    const result = await this.admin.findManyAdmin(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result;
  }

  async getAdminById(adminId) {
    const params = { where: { id: adminId } };
    const result = await this.admin.findOneAdmin(params);
    // if (result === null) throw new AppError("Admin not Found", 404);
    return result;
  }

  async getAdminByEmail(email) {
    const params = { where: { email: email } };
    const result = await this.admin.findOneAdmin(params);
    return result;
  }

  async updateAdmin(payload, adminId) {
    const params = { where: { id: adminId } };
    console.log(params);
    const getAdmin = await this.admin.findOneAdmin(params);
    const {fullname, email, password} = payload;
    const dataAdmin = getAdmin.dataValues
    // console.log(getAdmin);

    let updateData = {};
    if (dataAdmin.fullname !== fullname) {
      updateData.fullname = fullname;
    }
    if (dataAdmin.email !== email) {
      updateData.email = email;
    }
    if (dataAdmin.password !== password) {
      updateData.password = password;
    }
    
    const result = await this.admin.updateOneAdmin(payload, params);
    return result;
  }

  async deleteAdmin(adminId) {
    const params = {where: {id: adminId}}
    const result = await this.admin.deleteOneAdmin(params)
    return result;
  }
}
