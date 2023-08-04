import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class AuthValidator {

  public async validateSignupSchema(ctx: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.unique({ table: 'users', column: 'email' }),
        rules.email()
      ]),
      name: schema.string({
        escape: true,
        trim: true
      }),
      password: schema.string({ trim: true }, [rules.minLength(6)]),
      student_id: schema.string()

    })
    const msg = {
      'email.required': 'Email is required',
      'email.unique': 'Email is already in use',
      'email.email': 'Invalid email address',
      'name.required': 'Name is required',
      'password.required': 'Password is required',
      'password.minLength': 'Password must be at least 6 characters long',

    }

    return await ctx.request.validate({ schema: userSchema, messages: msg })




  }
  public async validateLoginSchema(ctx: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email({
          sanitize: true,
        }),

      ]),
      password: schema.string({ trim: true, }),


    })
    const msg = {
      'email.required': 'Email is required',
      'password.required': 'Password is required',

    }
    try {
      const payload = await ctx.request.validate({ schema: userSchema, messages: msg })
      return payload
    } catch (error) {
      return ctx.response.status(422).send(error.messages)
    }



  }

  public async validateResetSchema(ctx: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email({
          sanitize: true,
        }),

      ]),


    })
    const msg = {
      'email.required': 'Email is required',
    }
    try {
      const payload = await ctx.request.validate({ schema: userSchema, messages: msg })
      return payload
    } catch (error) {
      return ctx.response.status(422).send(error.messages)
    }



  }

  public async validateTokenData(ctx: HttpContextContract) {
    const userSchema = schema.create({
      verificationCode: schema.string({ trim: true }, [
        rules.minLength(6)
      ]),


    })
    const msg = {
      'verificationCode.required': 'Token is required',
      'verificationCode.minLength': 'Token must not less than 6 charecters!',
    }
    try {
      const payload = await ctx.request.validate({ schema: userSchema, messages: msg })
      return payload
    } catch (error) {
      return ctx.response.status(422).send(error.messages)
    }
  }

  public async validateNewPasswordData(ctx) {
    const userSchema = schema.create({
      password: schema.string({ trim: true }, [
        rules.minLength(6)
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.exists({ table: 'users', column: 'email' })
      ]),
    })
    const msg = {
      required: 'The {{field}} is required',
      'email.exists': 'invalid credentials',
      'email.minLength': 'Token must not less than 6 charecters!',
    }
    try {
      const payload = await ctx.request.validate({ schema: userSchema, messages: msg })
      return payload
    } catch (error) {
      return ctx.response.status(422).send(error.messages)
    }
  }

  async validateVerificationData(ctx) {

    const limitUserSchema = schema.create({
      verificationCode: schema.string({ trim: true }),
      email: schema.string({ trim: true }),
    })
    const messages = {
      required: 'The {{field}} is required',
    }

    return ctx.request.validate({ schema: limitUserSchema, messages: messages })

  }


}
