import AppError from "../../utils/app-error.js";
import Orders from "./repositories.js";
import OrderItem from "../../models/order-item.js";
import OrderItems from "../order-Item/repositories.js";
import { Op } from "sequelize";

export default class QueryOrder {
  constructor() {
    this.order = new Orders();
    this.orderItem = new OrderItems();
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

  async getOrderByUserId(userId) {
    const params = { include: [{ model: OrderItem }], where: { userId: userId } };
    const result = await this.order.findManyOrder(params);
    // if (result === null) throw new AppError("Order not Found", 404);
    return result;
  }

  async getOrderItems(query) {
    const { limit, page, date, start, end } = query;
    const millisTime = new Date(date).getTime();
    const millisStart = new Date(start).getTime();
    const millisEnd = new Date(end).getTime();
    const limitData = Number(limit) || 10;
    const skip = limitData * (Number(page) - 1 || 0);
    Number(limit) ? Number(limit) : 1000;
    Number(page) ? Number(page) : 0;

    let sort;
    let dateRange;
    if (date) {
      dateRange = {
        date: { [Op.between]: [millisTime - 7 * 24 * 3600 * 1000, millisTime] },
      };
      sort = "date";
    } else if (start && end) {
      dateRange = {
        date: { [Op.between]: [millisStart, millisEnd] },
      };
      sort = "date";
    } else {
      sort = "id";
    }

    const params = { limit: limitData, offset: skip, order: [[sort, "DESC"]], where: dateRange };
    const result = await this.orderItem.findManyOrderItem(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result;
  }

  async getSalesOrder(query) {
    const { date } = query;
    const millisTime = new Date(date).getTime();

    let sort;
    let dateRange;
    if (date) {
      dateRange = {
        date: { [Op.between]: [millisTime - 7 * 24 * 36 * 1e5, millisTime + 24 * 36 * 1e5 - 1] },
      };
      sort = "date";
    }
    const params = { order: [["date", "DESC"]], where: dateRange };
    const result = await this.orderItem.findManyOrderItem(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result;
  }

  async getReportOrder(query) {
    const { start, end } = query;
    const millisStart = new Date(start).getTime();
    const millisEnd = new Date(end).getTime();

    let dateRange;
    if (start && end) {
      dateRange = {
        date: { [Op.between]: [millisStart, millisEnd + 24 * 36 * 1e5 - 1] },
      };
    }
    const params = { order: [["date", "DESC"]], where: dateRange };
    const result = await this.orderItem.findManyOrderItem(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result;
  }
}
