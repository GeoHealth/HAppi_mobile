import { Component } from '@angular/core';
import {NavParams} from 'ionic-angular';
import {OccurrenceStorage} from '../../app/provider/occurrence_storage';
import {Symptom} from "../../models/symptom";
import {Occurrence} from "../../models/occurrence";
import {DateProvider} from "../../app/provider/date_provider";

@Component({
  selector: 'page-detailed-occurrence',
  templateUrl: 'detailedoccurrence.html'
})
export class DetailedOccurrencePage {

  occurrence: Occurrence;
  occurrences_storage: OccurrenceStorage;
  comment: string;

  constructor(private navParams: NavParams, occurrence_storage: OccurrenceStorage) {
    let symptom = navParams.get("symptom") as Symptom;
    this.occurrence = new Occurrence(symptom, DateProvider.getCurrentISODateAsString(), null);
    this.occurrences_storage = occurrence_storage;
  }

  save() {
    this.occurrences_storage.add(this.occurrence);
  }

}
