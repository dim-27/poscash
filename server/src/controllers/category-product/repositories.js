import CategoryProduct from "../../models/category-product.js";
import Category from "../../models/category.js";
import Product from "../../models/product.js";

CategoryProduct.belongsTo(Product);
CategoryProduct.belongsTo(Category);

export default class CategoryProducts {
  async findManyCategoryProduct(params) {
    const result = await CategoryProduct.findAll(params);
    return result;
  }

  async findOneCategoryProduct(params) {
    const result = await CategoryProduct.findOne(params);
    return result;
  }

  async insertOneCategoryProduct(data) {
    const result = await CategoryProduct.create(data);
    return result;
  }

  async updateOneCategoryProduct(data, params) {
    const result = await CategoryProduct.update(data, params);
    return result;
  }

  async deleteOneCategoryProduct(params) {
    const result = await CategoryProduct.destroy(params);
    return result;
  }
}
