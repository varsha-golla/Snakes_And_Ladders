import { Color } from "./Color.js";
import { Piece } from "./Piece.js";

export default abstract class Player {
  private _color: Color;
  private _pieces: Piece[];

  constructor(color: Color, pieces: Piece[]) {
    this._color = color;
    this._pieces = pieces;
  }

  get color(): Color {
    return this._color;
  }

  get pieces(): Piece[] {
    return this._pieces;
  }
}