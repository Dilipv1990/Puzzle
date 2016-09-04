import {Injectable} from '@angular/core';

@Injectable()
export class PuzzleData {
  puzzles:Array<Array<Array<string>>>;
  constructor() {
    let puzzle1 = [['c', 'a', 't', 'z'], ['a', 'g', 'o', 'd'], ['t', 'n', 'z', 'z'], ['z', 'z', 't', 'z']];
    let puzzle2 = [['C', 'I', 'R', 'N'], ['A', 'D', 'O', 'G'], ['T', 'C', 'I', 'S'], ['K', 'C', 'O', 'W']];
    let puzzle3 = [['D', 'N', 'O', 'M', 'A', 'I', 'D'], ['P', 'Q', 'I', 'N', 'E', 'E', 'G'], ['X', 'X', 'W', 'Q', 'T', 'D', 'K'], ['C', 'D', 'K', 'B', 'R', 'A', 'F'], ['U', 'W', 'E', 'R', 'A', 'F', 'X'], ['T', 'D', 'A', 'F', 'E', 'S', 'J'], ['A', 'K', 'J', 'S', 'H', 'H', 'E']];
    this.puzzles = [puzzle1, puzzle2, puzzle3];
  }
}
