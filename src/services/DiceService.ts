import { Dice } from "../models/Dice.js";

export default class DiceService {
  rollDice(dices: Dice[]): number {
    let diceValue = 0;
    for(let i = 0; i < dices.length; i++) {
      diceValue += dices[i].roll();
    }
    return diceValue;
  }
}