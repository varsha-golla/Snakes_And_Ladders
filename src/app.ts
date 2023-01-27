import CommandRegistry from "./commands/CommandRegistry.js";
import CreateUserCommand from "./commands/CreateUserCommand.js";
import StartGameCommand from "./commands/StartGameCommand.js";
import readline from 'readline-sync';

try {
  const commandRegistry = new CommandRegistry();
  commandRegistry.addCommand(new CreateUserCommand());
  commandRegistry.addCommand(new StartGameCommand());
  while(true) {
    const command = readline.question('');
    commandRegistry.executeCommand(command);
  }
} catch(err) {
  console.log(`Error: ${err}`);
}