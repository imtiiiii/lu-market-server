import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ProductService from "./ProductService";
import ProductValidator from "./ProductValidator";
export default class ProductController {
  private productService: ProductService;
  private productValidator: ProductValidator;
  constructor() {
    this.productService = new ProductService();
    this.productValidator = new ProductValidator();
  }
  public async getProductByLimit(ctx: HttpContextContract) {
    await this.productValidator.validateProductSchema(ctx);
    return this.productService.getProductByLimit(ctx);
  }
  async addBuyProduct(ctx: HttpContextContract) {
    if (!ctx.auth.user) return;
    const userId = ctx.auth.user.id;
    const payload = await this.productValidator.validateBuyProductSchema(ctx);
    const tempFileName = `${new Date().getTime()}.${payload.image.extname}`;
    await payload.image.moveToDisk("/", {
      name: tempFileName,
    });
    return await this.productService.addBuyProductService({
      name: payload.name,
      price: payload.price,
      description: payload.description,
      category: payload.category,
      image: tempFileName,
      user_id: userId,
    });
  }
  async addShopProduct(ctx: HttpContextContract) {
    if (!ctx.auth.user) return;
    const userId = ctx.auth.user.id;
    ctx.request.all().category = "shop";
    const payload = await this.productValidator.validateShopProduct(ctx);
    const tempFileName = `${new Date().getTime()}.${payload.image.extname}`;
    await payload.image.moveToDisk("/", {
      name: tempFileName,
    });
    return await this.productService.addShopProductService({
      name: payload.name,
      price: payload.price,
      description: payload.description,
      category: payload.category,
      image: tempFileName,
      user_id: userId,
      edition: payload.edition,
    });
  }
  async getProducts(ctx: HttpContextContract) {
    ctx.request.all().initial = ctx.request.qs().initial;
    ctx.request.all().category = ctx.request.qs().category;
    const payload = await this.productValidator.validateProductSchema(ctx);
    return await this.productService.getBuyProductService(payload);
  }
  async getBuyProductById(ctx: HttpContextContract) {
    try {
      ctx.request.all().productId = Number(ctx.params.id);
      const payload = await this.productValidator.validateSingleProduct(ctx);
      return await this.productService.getBuyProductByIdService(
        payload.productId
      );
    } catch (error) {
      console.log("🚀 ~ file: ProductController.ts:42 ~ error:", error);
    }
  }
}
