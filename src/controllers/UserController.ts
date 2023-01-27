import { User } from "../models/User.js";
import UserService from "../services/UserService.js";

export default class UserController {
  private userService = new UserService();

  createUser(name: string, emailId: string): User {
    return this.userService.createUser(name, emailId);
  }
}