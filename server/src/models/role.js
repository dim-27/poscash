import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Role = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  role: { type: DataTypes.ENUM(["admin", "cashier"]), unique: true },
});

export default Role;
