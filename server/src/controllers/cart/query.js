import AppError from "../../utils/app-error.js";
import Carts from "./repositories.js";
import CartItem from "../../models/cart-item.js";

export default class QueryCart {
  constructor() {
    this.cart = new Carts();
  }

  async getCarts() {
    const params = { include: [{ model: CartItem }] };
    const result = await this.cart.findManyCart(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result;
  }

  async getCartById(cartId) {
    const params = { where: { id: cartId } };
    const result = await this.cart.findOneCart(params);
    // if (result === null) throw new AppError("Cart not Found", 404);
    return result;
  }
}
