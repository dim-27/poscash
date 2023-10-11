import OrderItem from "../../models/order-item.js";
import Order from "../../models/order.js";
import User from "../../models/user.js";

Order.hasMany(OrderItem);
Order.belongsTo(User);

export default class Orders {
  async findManyOrder(params) {
    const result = await Order.findAll(params);
    return result;
  }

  async findOneOrder(params) {
    const result = await Order.findOne(params);
    return result;
  }

  async insertOneOrder(data) {
    const result = await Order.create(data);
    return result;
  }

  async updateOneOrder(data, params) {
    const result = await Order.update(data, params);
    return result;
  }

  async deleteOneOrder(params) {
    const result = await Order.destroy(params);
    return result;
  }
}
