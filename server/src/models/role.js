import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Role = sequelize.define("role", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  role: { type: DataTypes.ENUM(["admin", "cashier"]) },
});

export default Role;
