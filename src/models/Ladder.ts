import { Cell } from "./Cell.js";
import { CellType } from "./CellType.js";

export default class Ladder extends Cell {
  private end: number;

  constructor(start: number, end: number) {
    super(start, CellType.Ladder);
    this.end = end;
  }

  getNext(): number {
    return this.end;
  }
}