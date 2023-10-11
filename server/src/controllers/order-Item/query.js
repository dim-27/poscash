import AppError from "../../utils/app-error.js";
import OrderItems from "./repositories.js";

export default class QueryOrderItem {
  constructor() {
    this.orderItem = new OrderItems();
  }

  async getOrderItems() {
    const params = {};
    const result = await this.orderItem.findManyOrderItem(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result;
  }

  async getOrderItemById(orderItemId) {
    const params = { where: { id: orderItemId } };
    const result = await this.orderItem.findOneOrderItem(params);
    // if (result === null) throw new AppError("OrderItem not Found", 404);
    return result;
  }
}
