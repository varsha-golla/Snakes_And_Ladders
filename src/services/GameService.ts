import { Board } from "../models/Board.js";
import { Color } from "../models/Color.js";
import { Dice } from "../models/Dice.js";
import Game from "../models/Game.js";
import Human from "../models/Human.js";
import Ladder from "../models/Ladder.js";
import { Piece } from "../models/Piece.js";
import Player from "../models/Player.js";
import Snake from "../models/Snake.js";
import { WinnerDecidingStrategy } from "../strategies/WinnerDecidingStrategy.js";
import DiceService from "./DiceService.js";
import UserService from "./UserService.js";
import readline from 'readline-sync';

const PIECES_COUNT_PER_PLAYER = 1;
const NO_OF_FACES_ON_DICE = 6;

export default class GameService {
  private userService = new UserService();
  private diceService = new DiceService();

  createGame(
    playersEmailIds: string[], 
    boardSize: number, 
    noOfDices: number,
    snakesAndLaddersMode: string,
    snakes: Array<Array<number>>,
    ladders: Array<Array<number>>,
  ): Game {
    const players = this.getPlayers(playersEmailIds);
    const dices = this.getDices(noOfDices);
    const board = new Board(boardSize);

    if(snakesAndLaddersMode === 'AUTOMATIC') {
      snakes = [[22, 3], [99, 1]];
      ladders = [[36, 99], [65, 88]];
    }

    this.setSnakesAndLadders(board, snakes, ladders);

    const game = Game.getBuilder()
      .setPlayers(players)
      .setDices(dices)
      .setBoard(board)
      .setWinnerDecidingStrategy(new WinnerDecidingStrategy())
      .build()
    return game;
  }

  getPlayers(playersEmailIds: string[]): Player[] {
    const players: Player[] = [];
    for(let i = 0; i < playersEmailIds.length; i++) {
      const emailid = playersEmailIds[i];
      const user = this.userService.getUserByEmailId(emailid);
      const color = new Color();
      const pieces: Piece[] = [];
      for(let i = 0; i < PIECES_COUNT_PER_PLAYER; i++) {
        pieces.push(new Piece(color));
      }
      const player = new Human(user, color, pieces);
      players.push(player);
    }
    return players;
  }

  getDices(noOfDices: number): Dice[] {
    const dices: Dice[] = [];
    for(let i = 0; i < noOfDices; i++) {
      dices.push(new Dice(NO_OF_FACES_ON_DICE));
    }
    return dices;
  }

  setSnakesAndLadders(
    board: Board,
    snakes: Array<Array<number>>,
    ladders: Array<Array<number>>,
  ) {
    for(let i = 0; i < snakes.length; i++) {
      const head = snakes[i][0];
      const tail = snakes[i][1];
      board.setCell(head, new Snake(head, tail));
    }

    for(let i = 0; i < ladders.length; i++) {
      const start = ladders[i][0];
      const end = ladders[i][1];
      board.setCell(start, new Ladder(start, end));
    }
  }

  startGame(game: Game) {
    let players = game.players;
    const board = game.board;
    const dices = game.dices;
    const winnderDecidingStrategy = game.winnerDecidingStrategy;

    for(let i = 0; i < players.length; i++) {
      const player = players[i];
      for(let j = 0; j < player.pieces.length; j++) {
        const piece = player.pieces[j];
        board.getCell(1).addPiece(piece);
        piece.cellIndex = board.getCell(1).index;
      }
    }

    let playerIndex = 0;
    while(players.length > 1) {
      const diceValue = this.diceService.rollDice(dices);
      console.log('\nDice Value: ', diceValue);
      const currentPlayer = players[playerIndex];
      console.log(`Current Player: ${(currentPlayer as Human).user.name}`);
      console.log(`Pieces positions:`);
      for(let i = 0; i < currentPlayer.pieces.length; i++) {
        console.log(`Piece ${i}: ${currentPlayer.pieces[i].cellIndex}`);
      }
      const pieceIndex = Number(
        readline.question(
          `Enter Piece Index:`
        )
      );

      const piece = currentPlayer.pieces[pieceIndex];
      if(diceValue + piece.cellIndex > board.size) {
        playerIndex = playerIndex == players.length - 1 ? 0 : ++playerIndex;
        continue;
      }
      let currenctCell = board.getCell(piece.cellIndex);
      currenctCell.removePiece(piece);
      console.log(`Moving to ${currenctCell.index + diceValue}`);
      currenctCell = board.getCell(currenctCell.index + diceValue);
      while(currenctCell.getNext() != currenctCell.index) {
        console.log(`Moving to ${currenctCell.getNext()}`);
        currenctCell = board.getCell(currenctCell.getNext());
      }
      currenctCell.addPiece(piece);
      piece.cellIndex = currenctCell.index;

      if(winnderDecidingStrategy.isWinner(board, currentPlayer)) {
        console.log(`Congrats ${(currentPlayer as Human).user.name}!!! You won the game`);
        players = players.filter(player => player !== currentPlayer);
      }
      playerIndex = playerIndex == players.length - 1 ? 0 : ++playerIndex;
    }
    console.log('----------------GAME ENDED---------------');
    process.exit(0);
  }
}
