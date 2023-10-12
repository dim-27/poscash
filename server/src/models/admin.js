import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import bcrypt from "bcrypt";


const Admin = sequelize.define("admin", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fullname: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false},
  phone_number: { type: DataTypes.STRING, defaultValue: "" },
  birthdate: { type: DataTypes.STRING, defaultValue: "" },
  image_url: { type: DataTypes.STRING, defaultValue: "" },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Admin.build({
  email: "test1@mail.com",
  password: process.env.ADMIN_PASSWORD,
  fullname: "test1"
})

export default Admin;
