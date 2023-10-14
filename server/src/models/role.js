import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Role = sequelize.define(
  "role",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    role: { type: DataTypes.ENUM(["admin", "cashier"]) },
  },
  { timestamps: false }
);

<<<<<<< HEAD
export default Role;
=======

export default Role
>>>>>>> d9d386fda0ecea7e60d1041ff4fff8e8e2234e8d
