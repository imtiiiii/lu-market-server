import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
export default class ProductValidator {
  public async validateProductSchema(ctx: HttpContextContract) {
    const productSchema = schema.create({
      initial: schema.boolean(),
      category: schema.enum(["mobile", "laptop", "gadget","shop"] as const),
    });
    const msg = {
      "initial.boolean": "Initial must be a boolean",
      "category.enum": "Category must be a mobile, laptop, or gadget",
      "category.required": "Category is required",
      "initial.required": "Initial is required",
    };
    return await ctx.request.validate({ schema: productSchema, messages: msg });
  }
  async validateBuyProductSchema(ctx: HttpContextContract) {
    const buyProductSchema = schema.create({
      name: schema.string([rules.trim(), rules.maxLength(100)]),
      price: schema.number(),
      description: schema.string([rules.trim(), rules.maxLength(255)]),
      category: schema.enum(["mobile", "laptop", "gadget"] as const),
      image: schema.file({
        size: "2mb",
        extnames: ["jpg", "png", "jpeg"],
      }),
    });
    const msg = {
      "name.required": "Name is required",
      "name.string": "Name must be a string",
      "name.maxLength": "Name must be less than 100 characters",
      "price.required": "Price is required",
      "price.number": "Price must be a number",
      "description.required": "Description is required",
      "description.string": "Description must be a string",
      "description.maxLength": "Description must be less than 255 characters",
      "image.required": "Image is required",
      "image.file": "Image must be a file",
      "image.size": "Image must be less than 2mb",
      "image.extnames": "Image must be a jpg, png, or jpeg",
      "category.required": "Category is required",
      "category.enum": "Category must be a mobile, laptop, or gadget",
    };
    return await ctx.request.validate({
      schema: buyProductSchema,
      messages: msg,
    });
  }
  async validateShopProduct(ctx: HttpContextContract) {
    const shopProductSchema = schema.create({
      name: schema.string([rules.trim(), rules.maxLength(100)]),
      price: schema.number(),
      description: schema.string([rules.trim(), rules.maxLength(255)]),
      category: schema.enum(["shop"] as const),
      image: schema.file({
        size: "2mb",
        extnames: ["jpg", "png", "jpeg"],
      }),
      edition: schema.string([rules.trim(), rules.maxLength(10)]),
    });
    const msg = {
      "name.required": "Club Name is required",
      "name.string": "Club Name must be a string",
      "name.maxLength": "Club Name must be less than 100 characters",
      "price.required": "Price is required",
      "price.number": "Price must be a number",
      "description.required": "Description is required",
      "description.string": "Description must be a string",
      "description.maxLength": "Description must be less than 255 characters",
      "image.required": "Image is required",
      "image.file": "Image must be a file",
      "image.size": "Image must be less than 2mb",
      "image.extnames": "Image must be a jpg, png, or jpeg",
      "category.required": "Category is required",
      "category.enum": "Category must be a mobile, laptop, or gadget",
    };
    return await ctx.request.validate({
      schema: shopProductSchema,
      messages: msg,
    });
  }
  async validateSingleProduct(ctx: HttpContextContract) {
    const singleProductSchema = schema.create({
      productId: schema.number([
        rules.exists({ table: "products", column: "id" }),
      ]),
    });
    const msg = {
      "productId.required": "Product id is required",
      "productId.number": "Product id must be a number",
      "productId.exists": "Product id must be exists",
    };
    return await ctx.request.validate({
      schema: singleProductSchema,
      messages: msg,
    });
  }
}
