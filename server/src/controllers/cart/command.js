import AppError from "../../utils/app-error.js";
import Carts from "./repositories.js";
import CartItems from "../cart-item/repositories.js";
import QueryCart from "./query.js";
import QueryCartItem from "../cart-item/query.js";
import QueryProduct from "../product/query.js";

export default class CommandCart {
  constructor() {
    this.query = new QueryCart();
    this.queryCartItem = new QueryCartItem();
    this.queryProduct = new QueryProduct();
    this.cart = new Carts();
    this.cartItem = new CartItems();
  }

  async addCart(payload) {
    const { quantity, userId, productId } = payload;
    const data = {
      sub_total: 0,
      userId: userId,
    };

    const getProduct = await this.queryProduct.getProductById(productId);
    const { price, name } = getProduct.dataValues;
    const total = quantity * Number(price);
    const getCart = await this.query.getCartByUserId(userId);
    if (getCart) {
      const checkProduct = getCart.dataValues.cart_items.find((item) => item.dataValues.productId == productId);
      const item = getCart.dataValues.cart_items.find((item) => item.dataValues.productId == productId);
      const { id } = getCart.dataValues;
      if (checkProduct) {
        const getCartItem = await this.queryCartItem.getCartItemById(item.id);
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
        total_price: total,
        cartId: id,
        productId: productId,
      };
      let updateData = { sub_total: total };
      const params = { where: { id: id } };
      await this.cartItem.insertOneCartItem(dataCartItem);
      await this.cart.updateOneCart(updateData, params);
    }
  }

  async increaseQuantity(payload) {
    const { productId, userId } = payload;
    const params = { where: { productId: productId } };
    const getCart = await this.query.getCartByUserId(userId);
    const item = getCart.dataValues.cart_items.find((item) => item.dataValues.productId == productId);
    const getCartItem = await this.queryCartItem.getCartItemById(item.id);
    const { qty, price } = getCartItem.dataValues;
    const increase = Number(qty) + 1;
    const totalPrice = Number(price) * increase;
    const updateQty = { qty: increase, total_price: totalPrice };
    await this.cartItem.updateOneCartItem(updateQty, params);

    const getCarts = await this.query.getCartByUserId(userId);
    const { cart_items, id } = getCarts.dataValues;
    const subTotal = cart_items.map((item) => Number(item.dataValues.total_price)).reduce((a, b) => a + b);
    let updateSubTotal = { sub_total: subTotal };
    const paramsUpdate = { where: { id: id } };
    await this.cart.updateOneCart(updateSubTotal, paramsUpdate);
  }

  async decreaseQuantity(payload) {
    const { productId, userId } = payload;
    const params = { where: { productId: productId } };
    const getCart = await this.query.getCartByUserId(userId);
    const item = getCart.dataValues.cart_items.find((item) => item.dataValues.productId == productId);
    const getCartItem = await this.queryCartItem.getCartItemById(item.id);
    const { qty, price } = getCartItem.dataValues;
    const increase = Number(qty) - 1;
    const totalPrice = Number(price) * increase;
    const updateQty = { qty: increase, total_price: totalPrice };
    await this.cartItem.updateOneCartItem(updateQty, params);

    const updateCartItem = await this.queryCartItem.getCartItemById(item.id);
    if (updateCartItem.dataValues.qty < 1) await this.cartItem.deleteOneCartItem({ where: { id: item.id } });
    const getCarts = await this.query.getCartByUserId(userId);
    const { cart_items, id } = getCarts.dataValues;
    const paramsUpdate = { where: { id: id } };
    if (cart_items.length > 0) {
      const subTotal = cart_items.map((item) => Number(item.dataValues.total_price)).reduce((a, b) => a + b);
      let updateSubTotal = { sub_total: subTotal };
      await this.cart.updateOneCart(updateSubTotal, paramsUpdate);
    } else {
      await this.cart.updateOneCart({ sub_total: 0 }, paramsUpdate);
    }
  }

  async deleteCartItem(payload) {
    const { productId, userId } = payload;
    const getCart = await this.query.getCartByUserId(userId);
    const item = getCart.dataValues.cart_items.find((item) => item.dataValues.productId == productId);
    const params = { where: { id: item.id } };
    await this.cartItem.deleteOneCartItem(params);

    const getUpdateCart = await this.query.getCartByUserId(userId);
    const { cart_items, id } = getUpdateCart.dataValues;
    const paramsUpdate = { where: { id: id } };
    if (getUpdateCart.dataValues.cart_items.length > 0) {
      const subTotal = cart_items.map((item) => Number(item.dataValues.total_price)).reduce((a, b) => a + b);
      let updateSubTotal = { sub_total: subTotal };
      await this.cart.updateOneCart(updateSubTotal, paramsUpdate);
    } else {
      await this.cart.updateOneCart({ sub_total: 0 }, paramsUpdate);
    }
  }

  async deleteCart(cartId) {
    const params = { where: { id: cartId } };
    await this.cart.deleteOneCart(params);
  }
}
