export default class {
  dice:Dice;

  sortedDice:Dice;

  uniqueDice:Dice;

  diceOccurrences:DiceOccurrences;

  diceSum:number;

  threeOfAKind:undefined | number;

  fourOfAKind:undefined | number;

  fullHouse:undefined | 25;

  yams:undefined | 50;

  smallStraight:undefined | 30;

  largeStraight:undefined | 40;

  constructor(dice:Dice) {
    this.dice = dice;
    this.sortedDice = this.sortDice();
    this.uniqueDice = this.removeDuplicates();
    this.diceSum = this.addDice();
    this.diceOccurrences = this.countOccurrences();
    this.threeOfAKind = this.getThreeOfAKind();
    this.fourOfAKind = this.getFourOfAKind();
    this.fullHouse = this.getFullHouse();
    this.yams = this.getYams();
    this.smallStraight = this.getSmallStraight();
    this.largeStraight = this.getLargeStraight();
  }

  sortDice(dice:Dice = this.dice):Dice {
    return dice.sort((a, b) => a - b);
  }

  addDice():number {
    return this.dice.reduce((a, b) => a + b, 0);
  }

  removeDuplicates(dice:Dice = this.dice):Dice {
    return this.sortDice([...new Set(dice)]);
  }

  countOccurrences():DiceOccurrences {
    const result:DiceOccurrences = {};
    this.sortedDice
      .forEach((die) => {
        result[die] = result[die] ? result[die] + 1 : 1;
      });
    return result;
  }

  getTotal(diceToCompute:number):number {
    const totals:DiceOccurrences = {};
    Object.entries(this.diceOccurrences)
      .forEach(([index, value]) => {
        const numberIndex = Number(index);
        totals[numberIndex] = numberIndex * value;
      });
    return totals[diceToCompute] || 0;
  }

  lookForStraights():Array<boolean> {
    return this.uniqueDice
      .map((die, index, sortedDice) => {
        if (index !== sortedDice.length - 1) {
          return die + 1 === sortedDice[index + 1];
        }
        return true;
      });
  }

  getThreeOfAKind():undefined | number {
    return Object.values(this.diceOccurrences).includes(3)
      ? this.diceSum
      : undefined;
  }

  getFourOfAKind():undefined | number {
    return Object.values(this.diceOccurrences).includes(4)
      ? this.diceSum
      : undefined;
  }

  getFullHouse():undefined | 25 {
    return Object.values(this.diceOccurrences).includes(3)
    && Object.values(this.diceOccurrences).includes(2)
      ? 25
      : undefined;
  }

  getYams():undefined | 50 {
    return Object.values(this.diceOccurrences).includes(5)
      ? 50
      : undefined;
  }

  getSmallStraight():undefined | 30 {
    const isSmallStraight = this.lookForStraights();
    return isSmallStraight.every(Boolean)
        && isSmallStraight.length >= 4
      ? 30
      : undefined;
  }

  getLargeStraight():undefined | 40 {
    const isLargeStraight = this.lookForStraights();
    return isLargeStraight.every(Boolean)
        && isLargeStraight.length === 5
      ? 40
      : undefined;
  }
}