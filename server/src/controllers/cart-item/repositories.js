import CartItem from "../../models/cart-item.js";
import Cart from "../../models/cart.js";
import Product from "../../models/product.js";

CartItem.belongsTo(Cart);
CartItem.belongsTo(Product);

export default class CartItems {
  async findManyCartItem(params) {
    const result = await CartItem.findAll(params);
    return result;
  }

  async findOneCartItem(params) {
    const result = await CartItem.findOne(params);
    return result;
  }

  async insertOneCartItem(data) {
    const result = await CartItem.create(data);
    return result;
  }

  async updateOneCartItem(data, params) {
    const result = await CartItem.update(data, params);
    return result;
  }

  async deleteOneCartItem(params) {
    const result = await CartItem.destroy(params);
    return result;
  }
}
