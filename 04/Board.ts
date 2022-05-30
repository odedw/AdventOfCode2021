export class Board {
  rows = 5;
  cols = 5;
  done = false;
  cells: {
    value: number;
    marked: boolean;
  }[][] = [];
  constructor(input: string[]) {
    for (let i = 0; i < this.rows; i++) {
      const arr = [];
      let numbers = input[i].split(" ").map((n) => parseInt(n));
      for (let j = 0; j < this.rows; j++) {
        arr.push({ value: numbers[j], marked: false });
      }
      this.cells[i] = arr;
    }
  }

  check(row: number, col: number): boolean {
    let win = true;
    for (let i = 0; i < this.rows; i++) {
      if (!this.cells[i][col].marked) {
        win = false;
        break;
      }
    }

    if (win) {
      this.done = true;
      return true;
    }

    for (let j = 0; j < this.cols; j++) {
      if (!this.cells[row][j].marked) {
        return false;
      }
    }
    this.done = true;
    return true;
  }

  mark(value: number): boolean {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const element = this.cells[i][j];
        if (element.value == value) {
          element.marked = true;
          if (this.check(i, j)) return true;
        }
      }
    }
  }

  getScore(lastNumber: number): number {
    let sum = 0;
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if (!this.cells[i][j].marked) sum += this.cells[i][j].value;
      }
    }
    return sum * lastNumber;
  }

  print() {
    for (let i = 0; i < this.cells.length; i++) {
      console.log(this.cells[i].map((c) => c.value).join("|"));
    }
  }
}
