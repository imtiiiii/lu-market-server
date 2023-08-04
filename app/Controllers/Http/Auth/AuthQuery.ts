import User from '../../../Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import { RegisterPayload } from './Types';

export default class AuthQuery{
  
  searchUsername(username){
    return Database.from('users').where('username','like', `${username}%`).count('* as total')
  }
  
  async registerQuery(data:RegisterPayload){
    return await User.create(data);
  }
  
  updateUser(column, value, data){
    return User.query().where(column, value).update(data)
  }

  singleUserToken(column, value, token) {
    return User.query().where(column, value).where('forgot_code', token).first()
  }
  getSingleUserInfo(column, value) {
    return User.query().where(column, value).first()
  }
  updateOnline(uid, isOnline){
    return User.query().where('id', uid).update({is_online : isOnline})
  }
}
