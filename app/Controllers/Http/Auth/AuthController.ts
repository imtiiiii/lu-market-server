import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AuthService from "./AuthService";
import AuthValidator from "./AuthValidator";

export default class AuthController {
  private authService: AuthService;
  private authValidator: AuthValidator;

  constructor() {
    this.authService = new AuthService();
    this.authValidator = new AuthValidator();
  }

  async register(ctx: HttpContextContract) {
    const payload = await this.authValidator.validateSignupSchema(ctx);
    return await this.authService.register(payload, ctx.auth);
  }

  async login(ctx: HttpContextContract) {
    await this.authValidator.validateLoginSchema(ctx);
    let data = ctx.request.all();
    return await ctx.auth.use("web").attempt(data.email, data.password);
  }

  async getUser(ctx: HttpContextContract) {
    try {
      return await ctx.auth.use("web").authenticate();
    } catch (error) {
      console.log("🚀 ~ file: AuthController.ts:31 ~ error:", error)
      
    }
  }

  async logout({ auth }) {
    return await auth.logout();
  }

  async sendResetToken(ctx: HttpContextContract) {
    try {
      let validatedData = await this.authValidator.validateResetSchema(ctx);
      return this.authService.sendResetToken(ctx, validatedData);
    } catch (error) {
      return ctx.response.status(422).send(error.messages);
    }
  }

  async passwordReset(ctx: HttpContextContract) {
    try {
      let validatedData = await this.authValidator.validateNewPasswordData(ctx);
      return this.authService.passwordReset(ctx, validatedData);
    } catch (error) {
      return ctx.response.status(422).send(error.messages);
    }
  }
}
