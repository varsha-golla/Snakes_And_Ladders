import { User } from "../models/User.js";
const users: User[] = [];
export default class UserRepository {

  save(user: User) {
    users.push(user);
  }

  findByEmailId(emailId: string) {
    const user = users.find(user => user.emailId === emailId);
    if(!user) {
      throw new Error('user not found!');
    }
    return user;
  }
}
