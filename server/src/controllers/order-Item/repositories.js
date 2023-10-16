import OrderItem from "../../models/order-item.js";
import Order from "../../models/order.js";
import Product from "../../models/product.js";

OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

export default class OrderItems {
  async findManyOrderItem(params) {
    const result = await OrderItem.findAndCountAll(params);
    return result;
  }

  async findOneOrderItem(params) {
    const result = await OrderItem.findOne(params);
    return result;
  }

  async insertOneOrderItem(data) {
    const result = await OrderItem.create(data);
    return result;
  }

  async insertManyOrderItem(data) {
    const result = await OrderItem.bulkCreate(data);
    return result;
  }

  async updateOneOrderItem(data, params) {
    const result = await OrderItem.update(data, params);
    return result;
  }

  async deleteOneOrderItem(params) {
    const result = await OrderItem.destroy(params);
    return result;
  }
}
