import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CartItem = sequelize.define(
  "cart_item",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER },
    qty: { type: DataTypes.INTEGER },
    total_price: { type: DataTypes.TEXT },
  },
  { timestamps: false }
);

export default CartItem;
