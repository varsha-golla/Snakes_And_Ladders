import { Board } from "./Board.js";
import { Dice } from "./Dice.js";
import { IWinnerDecidingStrategy } from "../strategies/IWinnerDecidingStrategy.js";
import Player from "./Player.js";
import { WinnerDecidingStrategy } from "../strategies/WinnerDecidingStrategy.js";

export default class Game {
  private _players: Player[] = [];
  private _board: Board;
  private _dices: Dice[] = [];
  private _winnerDecidingStrategy: IWinnerDecidingStrategy;

  get players(): Player[] {
    return this._players;
  }

  get board(): Board {
    return this._board;
  }

  get dices(): Dice[] {
    return this._dices;
  }

  get winnerDecidingStrategy(): IWinnerDecidingStrategy {
    return this._winnerDecidingStrategy;
  }

  static getBuilder() {
    return new this.GameBuilder();
  }

  private static GameBuilder = class {
    private game: Game;

    constructor() {
      this.game = new Game();
    }

    setPlayers(players: Player[]) {
      this.game._players = players;
      return this;
    }

    setBoard(board: Board) {
      this.game._board = board;
      return this;
    }

    setDices(dices: Dice[]) {
      this.game._dices = dices;
      return this;
    }

    setWinnerDecidingStrategy(strategy: IWinnerDecidingStrategy) {
      this.game._winnerDecidingStrategy = strategy;
      return this;
    }

    private validate() {
      if(this.game.players.length < 2) {
        throw new Error('Game should have atleast two players');
      }

      const colorSet = new Set();
      for(let i = 0; i < this.game.players.length; i++) {
        const player = this.game.players[i];
        if(colorSet.has(player.color.color)) {
          throw new Error('Duplicate colors are not allowed for players');
        }
        colorSet.add(player.color.color);
      }

      if(this.game.dices.length < 1) {
        throw new Error('Atleast one dice should be present');
      }

      if(!this.game.board) {
        throw new Error('Please set the Board!');
      }

      if(!this.game.winnerDecidingStrategy) {
        this.game._winnerDecidingStrategy = new WinnerDecidingStrategy();
      }
    }

    build(): Game {
      this.validate();
      return this.game;
    }
  }
}