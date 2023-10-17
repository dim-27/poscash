import AppError from "../../utils/app-error.js";
import CartItems from "./repositories.js";

export default class QueryCartItem {
  constructor() {
    this.cartItem = new CartItems();
  }

  async getCartItems() {
    const params = {};
    const result = await this.cartItem.findManyCartItem(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result;
  }

  async getCartItemById(cartItemId) {
    const params = { where: { id: cartItemId } };
    console.log("params", params);
    const result = await this.cartItem.findOneCartItem(params);
    // if (result === null) throw new AppError("CartItem not Found", 404);
    return result;
  }

  async getCartItemByproductId(productId) {
    const params = { where: { productId: productId } };
    const result = await this.cartItem.findOneCartItem(params);
    // if (result === null) throw new AppError("CartItem not Found", 404);
    return result;
  }
}
