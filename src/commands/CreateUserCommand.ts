import UserController from "../controllers/UserController.js";
import { ICommand } from "./ICommand.js";

export default class CreateUserCommand implements ICommand {
  private userController: UserController = new UserController();
  matches(command: string): boolean {
    return command.startsWith('CREATE_USER');
  }

  execute(command: string): void {
    const commandArgs = command.split(' ');
    if(commandArgs.length !== 3) {
      throw new Error('Please provide both user name and emailId!');
    }

    this.userController.createUser(commandArgs[1], commandArgs[2]);
  }
}