export class Dice {
  private faces: number;

  constructor(faces: number) {
    this.faces = faces;
  }

  roll(): number {
    return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  }
}