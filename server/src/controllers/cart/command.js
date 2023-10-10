import AppError from "../../utils/app-error.js";
import Carts from "./repositories.js";
import QueryCart from "./query.js";

export default class CommandCart {
  constructor() {
    this.cart = new Carts();
    this.query = new QueryCart();
  }

  async addCart(payload) {
    const { subTotal, userId } = payload;
    const data = {
      sub_total: subTotal,
      userId: userId,
    };
    await this.cart.insertOneCart(data);
  }

  async deleteCart(cartId) {
    const params = { where: { id: cartId } };
    await this.cart.deleteOneCart(params);
  }
}
