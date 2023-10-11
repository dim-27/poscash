import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Employee = sequelize.define("employee", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cashierId: { type: DataTypes.INTEGER },
  adminId: { type: DataTypes.INTEGER },
});

export default Employee;
