import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OccurenceStorage} from '../../app/provider/occurence_storage'

@Component({
  selector: 'page-occurence',
  templateUrl: 'occurence.html'
})
export class OccurencePage {

  occurences_storage: OccurenceStorage;

  constructor(public navCtrl: NavController,  occurence_storage: OccurenceStorage) {
    this.occurences_storage = occurence_storage;
  }

}
