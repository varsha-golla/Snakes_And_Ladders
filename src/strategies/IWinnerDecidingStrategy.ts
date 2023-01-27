import { Board } from "../models/Board.js";
import Player from "../models/Player.js";

export interface IWinnerDecidingStrategy {
  isWinner(board: Board, player: Player): boolean;
}