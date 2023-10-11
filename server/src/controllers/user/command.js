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
    const encrypted = crypto.encryptAES(token);
    const link = `${process.env.CLIENT_LINK}/verify-email?token=${encrypted}&userId=${user.dataValues.id}`;
    mailer.verifyEmail(link, email);
  }

  async login(payload) {
    const { email, password } = payload;
    const checkUser = await this.query.getUserByEmail(email);
    if (checkUser === null) throw new AppError("Email not Found", 404);
    const dataUser = checkUser.dataValues;
    const checkPwd = await bcrypt.compareHash(password, checkUser.dataValues.password);
    if (!checkPwd) throw new AppError("Password not Match", 401);
    const data = { id: dataUser.id };
    const key = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1h" });
    const token = crypto.encryptAES(key);
    const userData = {
      id: checkUser.id,
      token,
    };
    return userData;
  }

  async uploadImage(file, userId) {
    const params = { where: { id: userId } };
    const getUser = await this.query.getUserById(userId);
    console.log(getUser);
    let updateData = {};
    const imageUrl = `http://localhost:8000/${file.filename}`;
    if (getUser.dataValues.image_url !== imageUrl) {
      updateData.image_url = imageUrl;
    }

    await this.user.updateOneUser(updateData, params);
  }
}
