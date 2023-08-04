import AuthQuery from "./AuthQuery";
import Mail from "@ioc:Adonis/Addons/Mail";
import User from "../../../Models/User";
import Hash from "@ioc:Adonis/Core/Hash";
import { RegisterPayload } from "./Types";
import { AuthContract } from "@ioc:Adonis/Addons/Auth";

export default class AuthService {
  private authQuery: AuthQuery;
  constructor() {
    this.authQuery = new AuthQuery();
  }

  public async register(payload: RegisterPayload, auth: AuthContract) {
    const user = await this.authQuery.registerQuery(payload);
    await auth.use("web").login(user);
    console.log("is authenticated", auth.isAuthenticated);
    return user;
  }
  public async sendResetToken(ctx, data) {
    const userInfo: any = await User.findBy("email", data.email);

    if (!userInfo) {
      return ctx.response.status(401).send({ msg: "Invalid credential!" });
    }

    // generating number
    let number = Math.floor(Math.random() * 899999 + 100000);

    await this.authQuery.updateUser("id", userInfo.id, {
      forgot_code: number,
    });

    let userInfo2: any = await User.findBy("email", data.email);
    let obj = {
      username: userInfo2?.first_name + " " + userInfo2?.last_name,
      token: userInfo2?.forgot_code,
    };
    await Mail.send((message) => {
      message
        .from("noreply@scrapabill.com", "Social Network")
        .to(data.email)
        .subject("Please confirm your email address")
        .htmlView("emails/password_reset", obj);
    });

    return ctx.response
      .status(200)
      .send({ msg: "Verification code sent successfully!" });
  }
  public async passwordReset(ctx, data) {
    // let data = ctx.request.all();
    const userInfo: any = await this.authQuery.getSingleUserInfo(
      "email",
      data.email
    );
    if (!userInfo) {
      return ctx.response.status(401).send({ msg: "Invalid Credential!" });
    }
    await this.authQuery.updateUser("id", userInfo.id, {
      password: await Hash.make(data.password),
      forgot_code: null,
    });

    return ctx.response
      .status(200)
      .send({ msg: "Password updated successfully!" });
    // return ctx.auth.use("web").attempt(data.email, data.password)
  }
}
