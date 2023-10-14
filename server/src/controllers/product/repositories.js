import Product from "../../models/product.js";
import CategoryProduct from "../../models/category-product.js";
import CartItem from "../../models/cart-item.js";
import OrderItem from "../../models/order-item.js";
import Category from "../../models/category.js";

Product.belongsTo(Category);
Product.hasMany(CartItem);
Product.hasMany(OrderItem);

export default class Products {
  async findManyProduct(params) {
    const result = await Product.findAll(params);
    return result;
  }

  async findOneProduct(params) {
    const result = await Product.findOne(params);
    return result;
  }

  async insertOneProduct(data) {
    const result = await Product.create(data);
    return result;
  }

  async updateOneProduct(data, params) {
    const result = await Product.update(data, params);
    return result;
  }

  async deleteOneProduct(params) {
    const result = await Product.destroy(params);
    return result;
  }
}
