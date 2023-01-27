import { Cell } from "./Cell.js";
import { EmptyCell } from "./EmptyCell.js";

export class Board {
  private _size: number;
  private cells: Cell[] = [];

  constructor(size: number) {
    this._size = size;
    for(let i = 0; i < size; i++) {
      this.cells.push(new EmptyCell(i + 1));
    }
  }

  get size(): number {
    return this._size;
  }

  getCell(index: number): Cell {
    return this.cells[index - 1];
  }

  setCell(index: number, cell: Cell) {
    this.cells[index - 1] = cell;
  }
}