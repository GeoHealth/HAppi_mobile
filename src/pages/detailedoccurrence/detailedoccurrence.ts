import { Component } from '@angular/core';
import {NavParams} from 'ionic-angular';
import {OccurrenceStorage} from '../../app/provider/occurrence_storage';
import {Symptom} from "../../models/symptom";

@Component({
  selector: 'page-detailed-occurrence',
  templateUrl: 'detailedoccurrence.html'
})
export class DetailedOccurrencePage {

  private symptom: Symptom;
  private occurrences_storage: OccurrenceStorage;

  constructor(private navParams: NavParams, occurrence_storage: OccurrenceStorage) {
    this.symptom = navParams.get("symptom");
    this.occurrences_storage = occurrence_storage;
  }

  save() {

  }

}
