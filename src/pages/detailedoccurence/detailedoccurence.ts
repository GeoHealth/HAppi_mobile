import { Component } from '@angular/core';
import {NavParams} from 'ionic-angular';
import {OccurenceStorage} from '../../app/provider/occurence_storage';
import {Symptom} from "../../models/symptom";

@Component({
  selector: 'page-detailed-occurence',
  templateUrl: 'detailedoccurence.html'
})
export class DetailedOccurrencePage {

  private symptom: Symptom;
  private occurences_storage: OccurenceStorage;

  constructor(private navParams: NavParams, occurence_storage: OccurenceStorage) {
    this.symptom = navParams.get("symptom");
    this.occurences_storage = occurence_storage;
  }

  save() {

  }

}
