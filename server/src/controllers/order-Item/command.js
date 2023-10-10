import AppError from "../../utils/app-error.js";
import OrderItems from "./repositories.js";
import QueryOrderItem from "./query.js";

export default class CommandOrderItem {
  constructor() {
    this.orderItem = new OrderItems();
    this.query = new QueryOrderItem();
  }

  async addOrderItem(payload) {
    const { name, price, qty, totalPrice, productId, orderId } = payload;
    const data = {
      name: name,
      price: price,
      qty: qty,
      total_price: totalPrice,
      productId: productId,
      orderId: orderId,
    };
    await this.orderItem.insertOneOrderItem(data);
  }

  async deleteOrderItem(orderItemId) {
    const params = { where: { id: orderItemId } };
    await this.orderItem.deleteOneOrderItem(params);
  }
}
