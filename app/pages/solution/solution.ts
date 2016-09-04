import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {PuzzlePage, SolutionData} from '../puzzle/puzzle'

@Component({
  templateUrl: 'build/pages/solution/solution.html'
})
export class SolutionPage {
  solutions: Array<SolutionData>;
  constructor(private navParams: NavParams, private navCtrl: NavController) {
    this.solutions = this.navParams.get("solutions");
  }
  new(): void {
    this.navCtrl.push(PuzzlePage,{count:this.navParams.get("count")});
  }
}
