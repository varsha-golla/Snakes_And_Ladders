import { ICommand } from "./ICommand.js";

export default class CommandRegistry {
  private commands: ICommand[] = []

  addCommand(command: ICommand) {
    this.commands.push(command);
  }

  executeCommand(userCommand: string) {
    for(let i = 0; i < this.commands.length; i++) {
      const command = this.commands[i];
      if(command.matches(userCommand)) {
        command.execute(userCommand);
        return;
      }
    }

    throw new Error('Invalid Command');
  }
}