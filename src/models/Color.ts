export class Color {
  private _color: number;
  private static colorId = 0;

  constructor() {
    this._color = ++Color.colorId;
  }

  get color(): number {
    return this._color;
  }
}