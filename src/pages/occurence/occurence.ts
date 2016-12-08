import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OccurrenceStorage} from '../../app/provider/occurence_storage';

@Component({
  selector: 'page-occurence',
  templateUrl: 'occurence.html'
})
export class OccurencePage {

  occurences_storage: OccurrenceStorage;

  constructor(public navCtrl: NavController,  occurence_storage: OccurrenceStorage) {
    this.occurences_storage = occurence_storage;
  }

}
