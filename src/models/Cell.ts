import { CellType } from "./CellType.js";
import { Piece } from "./Piece.js";

export abstract class Cell {
  private _index: number;
  private type: CellType;
  private pieces: Piece[] = []

  constructor(index: number, type: CellType) {
    this._index = index;
    this.type = type;
  }

  get index() {
    return this._index;
  }

  abstract getNext(): number;

  addPiece(piece: Piece) {
    this.pieces.push(piece);
  }

  removePiece(piece: Piece) {
    this.pieces.filter(p => p !== piece);
  }
}