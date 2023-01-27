import { Cell } from "./Cell.js";
import { CellType } from "./CellType.js";

export class EmptyCell extends Cell {
  constructor(index: number) {
    super(index, CellType.Empty);
  }

  getNext(): number {
    return this.index;
  }
}