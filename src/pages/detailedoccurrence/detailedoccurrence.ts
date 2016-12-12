import { Component } from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {OccurrenceStorage} from '../../app/provider/occurrence_storage';
import {Symptom} from "../../models/symptom";
import {Occurrence} from "../../models/occurrence";
import {DateProvider} from "../../app/provider/date_provider";
import {Factor} from "../../models/factor";

@Component({
  selector: 'page-detailed-occurrence',
  templateUrl: 'detailedoccurrence.html'
})
export class DetailedOccurrencePage {

  private occurrence: Occurrence;
  private occurrences_storage: OccurrenceStorage;
  private comment: string;

  constructor(public navCtrl: NavController, private navParams: NavParams, occurrence_storage: OccurrenceStorage) {
    let symptom = navParams.get("symptom") as Symptom;
    this.occurrence = new Occurrence(symptom, DateProvider.getCurrentISODateAsString(), null, null);
    this.occurrences_storage = occurrence_storage;
  }

  save() {
    this.occurrence.factors.push(new Factor(null, "comment", this.comment));
    this.occurrences_storage.add(this.occurrence);
    this.navCtrl.pop();
  }

}
