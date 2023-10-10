import Cart from "../../models/cart.js";
import User from "../../models/user.js";
import CartItem from "../../models/cart-item.js";

Cart.belongsTo(User);
Cart.hasMany(CartItem);

export default class Carts {
  async findManyCart(params) {
    const result = await Cart.findAll(params);
    return result;
  }

  async findOneCart(params) {
    const result = await Cart.findOne(params);
    return result;
  }

  async insertOneCart(data) {
    const result = await Cart.create(data);
    return result;
  }

  async updateOneCart(data, params) {
    const result = await Cart.update(data, params);
    return result;
  }

  async deleteOneCart(params) {
    const result = await Cart.destroy(params);
    return result;
  }
}
