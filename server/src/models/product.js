import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const placeholder =
  "https://static.vecteezy.com/system/resources/previews/003/170/825/original/isolated-food-plate-fork-and-spoon-design-free-vector.jpg";

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  image_url: { type: DataTypes.STRING, defaultValue: placeholder },
  description: { type: DataTypes.TEXT },
});

export default Product;
