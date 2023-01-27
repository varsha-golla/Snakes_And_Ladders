import { User } from "../models/User.js";
import UserRepository from "../repositories/UserRepository.js";

export default class UserService {
  private userRepository = new UserRepository();

  createUser(name: string, emailId: string): User {
    const user = new User(name, emailId);
    this.userRepository.save(user);
    return user;
  }

  getUserByEmailId(emailId: string) {
    const user = this.userRepository.findByEmailId(emailId);
    return user;
  }
}