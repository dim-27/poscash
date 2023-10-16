import Category from "../../models/category.js";
import Product from "../../models/product.js";

Category.hasMany(Product);

export default class Categories {
  async findManyCategory(params) {
    const result = await Category.findAll(params);
    return result;
  }

  async findOneCategory(params) {
    const result = await Category.findOne(params);
    return result;
  }

  async insertOneCategory(data) {
    const result = await Category.create(data);
    return result;
  }

  async insertManyCategory(data) {
    const result = await Category.bulkCreate(data);
    return result;
  }

  async updateOneCategory(data, params) {
    const result = await Category.update(data, params);
    return result;
  }

  async deleteOneCategory(params) {
    const result = await Category.destroy(params);
    return result;
  }
}
