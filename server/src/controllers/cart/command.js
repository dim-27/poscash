import AppError from "../../utils/app-error.js";
import Carts from "./repositories.js";
import QueryCart from "./query.js";
import QueryCartItem from "../cart-item/query.js";
import QueryProduct from "../product/query.js";

import CartItems from "../cart-item/repositories.js";
import CommandCartItems from "../cart-item/command.js";

export default class CommandCart {
  constructor() {
    this.query = new QueryCart();
    this.queryCartItem = new QueryCartItem();
    this.queryProduct = new QueryProduct();

    this.cart = new Carts();
    this.cartItem = new CartItems();
    // this.cartItem = new CommandCartItems();
  }

  async addCart(payload) {
    const { quantity, userId, productId } = payload;
    const data = {
      sub_total: 0,
      userId: userId,
    };

    const getProduct = await this.queryProduct.getProductById(productId);
    const { price, name } = getProduct.dataValues;
    const total = quantity * price;
    const getCart = await this.query.getCartByUserId(userId);
    if (getCart) {
      const checkProduct = getCart.dataValues.cart_items.find((item) => item.dataValues.productId == productId);
      const { id } = getCart.dataValues;
      if (checkProduct) {
        const getCartItem = await this.queryCartItem.getCartItemByproductId(productId);
        const { qty } = getCartItem.dataValues;
        const updateQty = qty + Number(quantity);
        if (updateQty < 1) {
          return await this.cartItem.deleteOneCartItem({ where: { id: getCartItem.dataValues.id } });
        }
        const updateTotal = updateQty * price;
        const dataCartItem = {
          name: name,
          qty: updateQty,
          price: price,
          total_price: updateTotal,
          cartId: id,
          productId: productId,
        };
        const params = { where: { id: getCartItem.dataValues.id } };
        await this.cartItem.updateOneCartItem(dataCartItem, params);
      } else {
        const dataCartItem = {
          name: name,
          qty: quantity,
          price: price,
          total_price: total,
          cartId: id,
          productId: productId,
        };
        await this.cartItem.insertOneCartItem(dataCartItem);
      }

      const getCarts = await this.query.getCartByUserId(userId);
      const { cart_items } = getCarts.dataValues;
      const subTotal = cart_items.map((item) => Number(item.dataValues.total_price)).reduce((a, b) => a + b);
      let updateData = { sub_total: subTotal };
      const params = { where: { id: id } };
      await this.cart.updateOneCart(updateData, params);
    } else {
      const cart = await this.cart.insertOneCart(data);
      const { id } = cart.dataValues;
      const dataCartItem = {
        name: name,
        qty: quantity,
        price: price,
        total: total,
        cartId: id,
        productId: productId,
      };
      const subTotal = total;
      let updateData = { sub_total: subTotal };
      const params = { where: { id: id } };
      await this.cartItem.insertOneCartItem(dataCartItem);
      await this.cart.updateOneCart(updateData, params);
    }
  }

  async deleteCart(cartId) {
    const params = { where: { id: cartId } };
    await this.cart.deleteOneCart(params);
  }
}
