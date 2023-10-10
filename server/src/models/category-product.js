import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CategoryProduct = sequelize.define(
  "category_product",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  },
  { timestamps: false }
);

export default CategoryProduct;
