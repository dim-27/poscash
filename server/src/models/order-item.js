import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OrderItem = sequelize.define(
  "order_item",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER },
    qty: { type: DataTypes.INTEGER },
    total_price: { type: DataTypes.INTEGER },
    date: { type: DataTypes.BIGINT },
  },
  { timestamps: false }
);

export default OrderItem;
