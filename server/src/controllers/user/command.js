import AppError from "../../utils/app-error.js";
import bcrypt from "../../helpers/bcrypt.js";
import jwt from "jsonwebtoken";
import mailer from "../../helpers/mailer.js";
import crypto from "../../helpers/crypto.js";
import Users from "./repositories.js";
import QueryUser from "./query.js";

export default class CommandUser {
  constructor() {
    this.user = new Users();
    this.query = new QueryUser();
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
    const checkUser = await this.query.getUserByEmail(email);
    if (checkUser !== null) throw new AppError("Email Already Exist", 403);
    const user = await this.user.insertOneUser(data);
    const token = jwt.sign({ id: user.dataValues.id }, process.env.SECRET_KEY);
    const encrypted = await crypto.encryptAES(token);
    const link = `${process.env.CLIENT_LINK}/verify-email?token=${encrypted}&userId=${user.dataValues.id}`;
    mailer.verifyEmail(link, email);
  }

  async loginCashier(payload) {
    const { email, password } = payload;
    const checkUser = await this.query.getUserByEmail(email);
    if (checkUser === null) throw new AppError("Email not Found", 404);
    const dataUser = checkUser.dataValues;
    const checkPwd = await bcrypt.compareHash(password, checkUser.dataValues.password);
    if (!checkPwd) throw new AppError("Password not Match", 401);
    const data = { id: dataUser.id };
    const key = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1d" });
    const token = await crypto.encryptAES(key);
    const userData = {
      id: checkUser.id,
      token,
    };
    return userData;
  }

  async loginAdmin(payload) {
    const { email, password } = payload;
    const checkUser = await this.query.getUserByEmail(email);
    if (checkUser === null) throw new AppError("Email not Found", 404);
    const dataUser = checkUser.dataValues;
    const checkPwd = await bcrypt.compareHash(password, checkUser.dataValues.password);
    if (!checkPwd) throw new AppError("Password not Match", 401);
    const data = { id: dataUser.id };
    const key = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1d" });
    const token = crypto.encryptAES(key);
    const userData = {
      id: dataUser.id,
      role: dataUser.roleId,
      token,
    };
    return userData;
  }

  async uploadImage(file, userId) {
    const params = { where: { id: userId } };
    const getUser = await this.query.getUserById(userId);
    let updateData = {};
    const imageUrl = `http://localhost:8000/${file.filename}`;
    if (getUser.dataValues.image_url !== imageUrl) {
      updateData.image_url = imageUrl;
    }

    await this.user.updateOneUser(updateData, params);
  }

  async resetPassword(payload) {
    const { email } = payload;
    const getUser = await this.query.getUserByEmail(email);
    if (getUser === null) throw new AppError("Email not Found", 404);
    const token = await bcrypt.generateHash(String(getUser.dataValues.id));
    const link = `${process.env.CLIENT_LINK}/reset-password?token=${token}&userId=${getUser.dataValues.id}`;
    mailer.resetPassword(link, email);
  }

  async updateResetPassword(payload) {
    const { newPassword, confirmPassword, token, userId } = payload;
    const getUser = await this.query.getUserById(userId);
    const params = { where: { id: userId } };
    const userData = getUser.dataValues;

    const validateToken = await bcrypt.compareHash(String(userData.id), token);
    if (!validateToken) throw new AppError("Invalid Token", 403);

    if (validateToken) {
      if (newPassword !== confirmPassword) throw new AppError("Password not Match", 403);
      if (newPassword || confirmPassword) {
        if (newPassword === confirmPassword) {
          const password = await bcrypt.generateHash(newPassword);
          const updateData = { password: password };
          await this.user.updateOneUser(updateData, params);
        }
      }
    }
  }
}
