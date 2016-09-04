import {Component} from '@angular/core';
import {NavController, NavParams,ToastController} from 'ionic-angular';
import {PuzzleData} from '../data/data';
import { PopoverController } from 'ionic-angular';
import { ModalPage } from '../addmodal/addmodal';
import {SolutionPage} from '../solution/solution'

@Component({
  templateUrl: 'build/pages/puzzle/puzzle.html',
  providers: [PuzzleData]
})
export class PuzzlePage {
  currentPuzzle: Array<Array<string>>;
  count: number;
  words: Array<string>;
  solution: Array<SolutionData>;
  constructor(private navCtrl: NavController, private puzzleData: PuzzleData, private popoverController: PopoverController, private navParams: NavParams,private toastCtrl: ToastController) {
    this.count = this.navParams.get("count") ? this.navParams.get("count") : 0;
    this.currentPuzzle = this.puzzleData.puzzles[this.count];
    this.words = [];
    this.solution = [];
  }
  getNextPuzzle(): number {
    return (this.count + 1) % this.puzzleData.puzzles.length;
  }
  addWord(): void {
    let modal = this.popoverController.create(ModalPage, { words: this.words });
    modal.present();
  }
  removeWord($index): void {
    this.words.splice($index, 1);
  }

  presentToast(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  solve(): void {
    this.solution = [];
    if (!this.words || this.words.length == 0) {
      this.presentToast("Please enter atleast one word to solve the puzzle!");
      return;
    }
    for (let index in this.words) {
      let word = this.words[index].split('');
      this.solution.push(this.findFirstMatch(word));
    }
    for (let i in this.solution) {
      console.log("sol", this.solution[i]);
    }

    this.navCtrl.push(SolutionPage, { solutions: this.solution, count: this.getNextPuzzle() });
  }

  findFirstMatch(word: Array<string>): SolutionData {
    console.log("word", word);
    let sol = new SolutionData();
    sol.word = word.join("");
    for (let i in this.currentPuzzle) {
      let wordIndex = 0;
      for (let j in this.currentPuzzle[i]) {
        if (this.currentPuzzle[i][j].toUpperCase() == word[wordIndex].toUpperCase()) {
          if (wordIndex == 0) {
            sol.startIndex = "(" + i + "," + j + ")";
          }
          if (wordIndex == word.length - 1) {
            sol.endIndex = "(" + i + "," + j + ")";
            return sol;
          } else {
            wordIndex += 1;
          }
        }
        else
          wordIndex = 0;
      }
    }
    for (let i in this.currentPuzzle) {
      let wordIndex = 0;
      for (let j in this.currentPuzzle[i]) {
        if (this.currentPuzzle[j][i].toUpperCase() == word[wordIndex].toUpperCase()) {
          if (wordIndex == 0) {
            sol.startIndex = "(" + j + "," + i + ")";
          }
          if (wordIndex == word.length - 1) {
            sol.endIndex = "(" + j + "," + i + ")";
            return sol;
          }
          else {
            wordIndex += 1;
          }
        }
        else
          wordIndex = 0;
      }
    }

    word = word.reverse();
    for (let i in this.currentPuzzle) {
      let wordIndex = 0;
      for (let j in this.currentPuzzle[i]) {
        if (this.currentPuzzle[i][j].toUpperCase() == word[wordIndex].toUpperCase()) {
          if (wordIndex == 0) {
            sol.endIndex = "(" + i + "," + j + ")";
          }
          if (wordIndex == word.length - 1) {
            sol.startIndex = "(" + i + "," + j + ")";
            return sol;
          } else {
            wordIndex += 1;
          }
        }
        else
          wordIndex = 0;
      }
    }
    for (let i in this.currentPuzzle) {
      let wordIndex = 0;
      for (let j in this.currentPuzzle[i]) {
        if (this.currentPuzzle[j][i].toUpperCase() == word[wordIndex].toUpperCase()) {
          if (wordIndex == 0) {
            sol.endIndex = "(" + j + "," + i + ")";
          }
          if (wordIndex == word.length - 1) {
            sol.startIndex = "(" + j + "," + i + ")";
            return sol;
          } else {
            wordIndex += 1;
          }
        }
        else
          wordIndex = 0;
      }
    }

    sol.startIndex = "-"
    sol.endIndex = "-";
    return sol;
  }
}
export class SolutionData {
  word: string;
  startIndex: string;
  endIndex: string;
}
