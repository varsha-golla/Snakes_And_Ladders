import Game from "../models/Game.js";
import GameService from "../services/GameService.js";

export default class GameController {
  private gameService = new GameService();
  createGame(
    playersEmailIds: string[], 
    boardSize: number, 
    noOfDices: number,
    snakesAndLaddersMode: string,
    snakes: Array<Array<number>>,
    ladders: Array<Array<number>>,
  ): Game {
    return this.gameService.createGame(
      playersEmailIds,
      boardSize,
      noOfDices,
      snakesAndLaddersMode,
      snakes,
      ladders,
    );
  }

  startGame(game: Game) {
    this.gameService.startGame(game);
  }
}