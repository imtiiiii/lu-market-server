import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name : string
  @column()
  public price : number
  @column()
  public description : string
  @column()
  public category : string
  @column()
  public image : string
  @column()
  public user_id : number
  @column()
  public edition ?: string




  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(()=>User,{
    localKey:'user_id',
    foreignKey:'id'
  })
  public product_owner: HasOne<typeof User>

}
