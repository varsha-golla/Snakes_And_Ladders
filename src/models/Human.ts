import { Color } from "./Color.js";
import { Piece } from "./Piece.js";
import Player from "./Player.js";
import { User } from "./User.js";

export default class Human extends Player {
  private _user: User;

  constructor(user: User, color: Color, pieces: Piece[]) {
    super(color, pieces);
    this._user = user;
  }

  get user(): User {
    return this._user;
  }
}