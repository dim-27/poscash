import AppError from "../../utils/app-error.js";
import Orders from "./repositories.js";
import OrderItems from "../order-Item/repositories.js";
import QueryOrder from "./query.js";
import QueryOrderItem from "../order-Item/query.js";
import QueryProduct from "../product/query.js";
import QueryCart from "../cart/query.js";
import Carts from "../cart/repositories.js";

export default class CommandOrder {
  constructor() {
    this.query = new QueryOrder();
    this.queryProduct = new QueryProduct();
    this.queryOrderItem = new QueryOrderItem();
    this.queryCart = new QueryCart();
    this.order = new Orders();
    this.orderItem = new OrderItems();
    this.cart = new Carts();
  }

  async addOrder(payload) {
    const { userId } = payload;
    const data = {
      sub_total: 0,
      userId: userId,
    };

    const order = await this.order.insertOneOrder(data);
    const getCart = await this.queryCart.getCartByUserId(userId);
    const itemList = getCart.dataValues.cart_items.map((item) => {
      let transformData = {
        name: item.dataValues.name,
        price: item.dataValues.price,
        qty: item.dataValues.qty,
        total_price: item.dataValues.total_price,
        productId: item.dataValues.productId,
        orderId: order.dataValues.id,
      };
      return transformData;
    });

    const subTotal = getCart.dataValues.sub_total;
    let updateData = { sub_total: subTotal };
    const params = { where: { id: order.dataValues.id } };
    const paramsCart = { where: { userId: userId } };
    await this.orderItem.insertManyOrderItem(itemList);
    await this.order.updateOneOrder(updateData, params);
    await this.cart.deleteOneCart(paramsCart);
  }

  async deleteOrder(orderId) {
    const params = { where: { id: orderId } };
    await this.order.deleteOneOrder(params);
  }
}
