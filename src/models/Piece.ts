import { Cell } from "./Cell.js";
import { Color } from "./Color.js";

export class Piece {
  private color: Color;
  private _cellIndex: number;

  constructor(color: Color) {
    this.color = color;
  }

  set cellIndex(index: number) {
    this._cellIndex = index;
  }

  get cellIndex(): number {
    return this._cellIndex;
  }
}