import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Cart = sequelize.define("cart", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  sub_total: { type: DataTypes.INTEGER },
});

export default Cart;
