import {Component, ViewChild, ElementRef} from '@angular/core';
import { ViewController, Page, NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/addmodal/addmodal.html'
})

export class ModalPage {
  word: string;
  constructor(private popoverController: ViewController, private navParams: NavParams) {
  }
  addWord(): void {
    if (this.word) {
      this.navParams.get('words').push(this.word);
      console.log(this.navParams.get('words'), this.word, this.navParams.get('words').length);
      this.popoverController.dismiss();
    }
  }
  cancel(): void {
    console.log("cancel clicked!")
    this.popoverController.dismiss();

  }
}
