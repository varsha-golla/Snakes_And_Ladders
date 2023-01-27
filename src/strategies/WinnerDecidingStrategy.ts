import { Board } from "../models/Board.js";
import Player from "../models/Player.js";
import { IWinnerDecidingStrategy } from "./IWinnerDecidingStrategy.js";

export class WinnerDecidingStrategy implements IWinnerDecidingStrategy {
  isWinner(board: Board, player: Player): boolean {
    const lastCell = board.getCell(board.size);
    for(let i = 0; i < player.pieces.length; i++) {
      const piece = player.pieces[i];
      if(piece.cellIndex !== lastCell.index) {
        return false;
      }
    }
    return true;
  }
}