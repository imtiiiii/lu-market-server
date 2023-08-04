/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }
  protected codes=[
    "E_ROUTE_NOT_FOUND",
    "E_INVALID_AUTH_UID",
    "E_INVALID_AUTH_PASSWORD",
    "E_VALIDATION_FAILURE"
  ]

  constructor () {
    super(Logger)
  }
  public async handle(error: any, ctx: HttpContextContract) {
    console.log('handle !!!!!!!!!error',error.code)
    if(error.code && this.codes.includes(error.code)){
      if(error.code=="E_ROUTE_NOT_FOUND"){
        return ctx.response.status(404).send({message:"Route Not Found"})
      }
      if(error.code=="E_INVALID_AUTH_UID" || error.code=="E_INVALID_AUTH_PASSWORD"){ 
        return ctx.response.status(403).send({message:"Invalid credentials"})
      }
      if(error.code=="E_VALIDATION_FAILURE"){
        return ctx.response.status(422).send({message:error.messages.errors[0].message})
      }
    }
    return ctx.response.status(500).send({message:"Internal Server Error"})
    
  }
}
