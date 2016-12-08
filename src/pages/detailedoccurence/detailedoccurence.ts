import { Component } from '@angular/core';
import {NavParams} from 'ionic-angular';
import {OccurrenceStorage} from '../../app/provider/occurence_storage';
import {Symptom} from "../../models/symptom";

@Component({
  selector: 'page-detailed-occurence',
  templateUrl: 'detailedoccurence.html'
})
export class DetailedOccurrencePage {

  private symptom: Symptom;
  private occurrences_storage: OccurrenceStorage;

  constructor(private navParams: NavParams, occurence_storage: OccurrenceStorage) {
    this.symptom = navParams.get("symptom");
    this.occurrences_storage = occurence_storage;
  }

  save() {
    //TODO
  }

}
