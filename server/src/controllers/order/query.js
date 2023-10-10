import AppError from "../../utils/app-error.js";
import Orders from "./repositories.js";
import OrderItem from "../../models/order-item.js";

export default class QueryOrder {
  constructor() {
    this.order = new Orders();
  }

  async getOrders() {
    const params = { include: [{ model: OrderItem }] };
    const result = await this.order.findManyOrder(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result;
  }

  async getOrderById(orderId) {
    const params = { where: { id: orderId } };
    const result = await this.order.findOneOrder(params);
    // if (result === null) throw new AppError("Order not Found", 404);
    return result;
  }
}
