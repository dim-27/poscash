import AppError from "../../utils/app-error.js";
import Products from "./repositories.js";
import QueryProduct from "./query.js";
import CategoryProducts from "../category-product/repositories.js";

export default class CommandProduct {
  constructor() {
    this.porduct = new Products();
    this.query = new QueryProduct();
    this.categoryProduct = new CategoryProducts();
  }

  async addProduct(payload) {
    const { name, price, imageUrl, description, categoryId } = payload;
    const data = {
      name: name,
      price: price,
      image_url: imageUrl,
      description: description,
      categoryId: categoryId,
    };
    await this.porduct.insertOneProduct(data);
  }

  async updateProduct(payload, productId) {
    const { name, price, imageUrl, description } = payload;
    const params = { where: { id: productId } };
    const getProduct = await this.query.getProductById(productId);
    const dataProduct = getProduct.dataValues;

    let updateData = {};
    if (dataProduct.name !== name) {
      updateData.name = name;
    }
    if (dataProduct.price !== price) {
      updateData.price = price;
    }
    if (dataProduct.image_url !== imageUrl) {
      updateData.image_url = imageUrl;
    }
    if (dataProduct.description !== description) {
      updateData.description = description;
    }

    await this.porduct.updateOneProduct(updateData, params);
  }

  async deleteProduct(productId) {
    const params = { where: { id: productId } };
    await this.porduct.deleteOneProduct(params);
  }
}
