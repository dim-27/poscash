import AppError from "../../utils/app-error.js";
import Orders from "./repositories.js";
import QueryOrder from "./query.js";

export default class CommandOrder {
  constructor() {
    this.order = new Orders();
    this.query = new QueryOrder();
  }

  async addOrder(payload) {
    const { subTotal, userId } = payload;
    const data = {
      sub_total: subTotal,
      userId: userId,
    };

    await this.order.insertOneOrder(data);
  }

  async deleteOrder(orderId) {
    const params = { where: { id: orderId } };
    await this.order.deleteOneOrder(params);
  }
}
