import AppError from "../../utils/app-error.js";
import tryCatch from "../../utils/try-catch.js";
import Users from "../user/repositories.js";
import Roles from "../role/repositories.js";
import Categories from "../category/repositories.js";
import utils from "../../utils/utils.js";
import bcrypt from "../../helpers/bcrypt.js";

const category = new Categories();
const role = new Roles();
const user = new Users();

const firtsInit = tryCatch(async (req, res) => {
  const dataCategory = [{ category: "food" }, { category: "drink" }, { category: "dessert" }];
  const dataRole = [{ role: "admin" }, { role: "cashier" }];
  const pwd = await bcrypt.generateHash(process.env.ADMIN_PASS);
  const dataUser = {
    fullname: "admin",
    email: "admin@mail.com",
    password: pwd,
    image_url: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png?ga=GA1.1.936509035.1697125601&track=ais",
    roleId: 1,
    is_active: true,
  };
  const params = { where: { roleId: 1 } };
  const checkAdmin = await user.findOneUser(params);
  if (checkAdmin) throw new AppError("Enough! ✋", 400);
  await category.insertManyCategory(dataCategory);
  await role.insertManyRole(dataRole);
  await user.insertOneUser(dataUser);
  // console.log(dataUser);
  return utils.responseSuccess(res);
});

export default firtsInit;
