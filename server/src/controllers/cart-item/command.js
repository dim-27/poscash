import AppError from "../../utils/app-error.js";
import CartItems from "./repositories.js";
import QueryCartItem from "./query.js";

export default class CommandCartItem {
  constructor() {
    this.cartItem = new CartItems();
    this.query = new QueryCartItem();
  }

  async addCartItem(payload) {
    const { name, price, qty, total, productId, cartId } = payload;
    const data = {
      name: name,
      price: price,
      qty: qty,
      total: total,
      productId: productId,
      cartId: cartId,
    };

    await this.cartItem.insertOneCartItem(data);
  }

  async deleteCartItem(cartItemId) {
    const params = { where: { id: cartItemId } };
    await this.cartItem.deleteOneCartItem(params);
  }
}
