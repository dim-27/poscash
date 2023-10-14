import AppError from "../../utils/app-error.js";
import bcrypt from "../../helpers/bcrypt.js";
import jwt from "jsonwebtoken";
import mailer from "../../helpers/mailer.js";
import crypto from "../../helpers/crypto.js";
import Admins from "./repositories.js";
import QueryAdmin from "./query.js";

export default class CommandAdmin {
  constructor() {
    this.admin = new Admins();
    this.query = new QueryAdmin();
  }

  async register(payload) {
    const { fullname, email, password } = payload;
    const pwd = await bcrypt.generateHash(password);
    const imageURL = `https://robohash.org/${fullname}`;
    const data = {
      fullname: fullname,
      email: email,
      password: pwd,
      image_url: imageURL,
    };
    const checkAdmin = await this.query.getAdminByEmail(email);
    if (checkAdmin !== null) throw new AppError("Email Already Exist", 403);
    const admin = await this.admin.insertOneAdmin(data);
    const token = jwt.sign({ id: admin.dataValues.id }, process.env.SECRET_KEY);
    const encrypted = crypto.encryptAES(token);
    const link = `${process.env.CLIENT_LINK}/verify-email?token=${encrypted}&adminId=${admin.dataValues.id}`;
    mailer.verifyEmail(link, email);
  }

  async login(payload) {
    const { email, password } = payload;
    const checkAdmin = await this.query.getAdminByEmail(email);
    if (checkAdmin === null) throw new AppError("Email not Found", 404);
    const dataAdmin = checkAdmin.dataValues;
    const checkPwd = await bcrypt.compareHash(password, checkAdmin.dataValues.password);
    if (!checkPwd) throw new AppError("Password not Match", 401);
    const data = { id: dataAdmin.id };
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1h" });
    const adminData = {
      id: checkAdmin.id,
      token,
    };
    return adminData;
  }
}
