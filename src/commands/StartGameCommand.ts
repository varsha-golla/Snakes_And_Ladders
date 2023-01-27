import { ICommand } from "./ICommand.js";
import GameController from "../controllers/GameController.js";
import readline from 'readline-sync';

export default class StartGameCommand implements ICommand {
  private gameController: GameController = new GameController();
  matches(command: string): boolean {
    return command.startsWith('START_GAME');
  }

  execute(command: string): void {
    const players =  readline.question('Enter players emailIds space separated:');
    const playersEmailIds = players.split(' ');

    const boardSize = Number(readline.question('Enter the board size:'));

    const noOfDices = Number(readline.question('Enter the number of dices:'));

    const snakes: Array<Array<number>> = [];
    const ladders: Array<Array<number>> = [];

    const snakesAndLaddersMode = readline.question('Enter the mode to decide Snake and Ladders Position: MANUAL/AUTOMATIC');
    if(snakesAndLaddersMode === 'MANUAL') {
      const snakesCount = Number(readline.question('Enter number of snakes:'));
      for(let i = 0; i < snakesCount; i++) {
        const positions = readline.question('').split(' ');
        snakes.push([Number(positions[0]), Number(positions[1])]);
      }
      
      const laddersCount = Number(readline.question('Enter number of ladders:'));
      for(let i = 0; i < laddersCount; i++) {
        const positions = readline.question('').split(' ');
        ladders.push([Number(positions[0]), Number(positions[1])]);
      }
    }

    const game = this.gameController.createGame(
      playersEmailIds,
      boardSize,
      noOfDices,
      snakesAndLaddersMode,
      snakes,
      ladders,
    );
    this.gameController.startGame(game);
  }
}
