import Product from "App/Models/Product";
import User from "../../../Models/User";
import { AddBuyProductType, AddShopProduct, GetProduct } from "./Types";
export default class ProductQuery {
  public async getUserByLimit(limit: number): Promise<User[]> {
    const user = User.query().limit(limit);
    return user;
  }
  async addBuyProductQuery(data: AddBuyProductType) {
    return await Product.create(data);
  }
  async addShopProductQuery(data: AddShopProduct) {
    return await Product.create(data);
  }
  async getBuyProductQuery(data: GetProduct) {
    const product = Product.query().where("category", data.category);
    if (data.initial) {
      product.limit(3);
    }
    return await product;
  }
  async getBuyProductByIdQuery(productId: number) {
    return await Product.query()
      .where("id", productId)
      .preload("product_owner")
      .first();
  }
}
