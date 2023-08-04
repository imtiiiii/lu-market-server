import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ProductQuery from "./ProductQuery";
import { AddBuyProductType, AddShopProduct, GetProduct } from "./Types";


export default class ProductService {
  private productQuery: ProductQuery;
  constructor() {
    this.productQuery = new ProductQuery();
  }
  public async getProductByLimit(ctx: HttpContextContract) {
    const limit = ctx.request.all().limit;
    const user = await this.productQuery.getUserByLimit(limit);
    return user;
  }
  async addBuyProductService(payload: AddBuyProductType) {
    return await this.productQuery.addBuyProductQuery(payload);
  }
  async addShopProductService(payload: AddShopProduct) {
    return await this.productQuery.addShopProductQuery(payload);
  }
  async getBuyProductService(payload: GetProduct) {
    return await this.productQuery.getBuyProductQuery(payload);
  }
  async getBuyProductByIdService(productId: number) {
    return await this.productQuery.getBuyProductByIdQuery(productId);
  }
}
