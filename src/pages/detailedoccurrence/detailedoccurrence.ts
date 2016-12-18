import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {OccurrenceStorage} from '../../app/provider/occurrence_storage';
import {Occurrence} from "../../models/occurrence";
import {DateProvider} from "../../app/provider/date_provider";
import {GPSCoordinates} from "../../models/coordinate";
import {Geolocation} from 'ionic-native';
import {DOMHelper} from "../../app/domhelper/domhelper";
import {FactorInstance} from "../../models/factor_instance";
import {SymptomWithFactor} from "../../models/symptom_with_factors";

@Component({
  selector: 'page-detailed-occurrence',
  templateUrl: 'detailedoccurrence.html'
})
export class DetailedOccurrencePage {


  occurrence: Occurrence;
  occurrences_storage: OccurrenceStorage;
  comment: string;
  save_btn_id = "save-btn";
  loadingLocation: boolean;
  locationError: boolean;

  constructor(public navCtrl: NavController, private navParams: NavParams, occurrence_storage: OccurrenceStorage) {
    let symptom = navParams.get("symptom") as SymptomWithFactor;
    this.occurrence = new Occurrence(symptom, DateProvider.getCurrentISODateAsString(), null, null);
    this.occurrences_storage = occurrence_storage;
    this.retrieveCurrentLocation();
    this.addFactorsToOccurrence();
  }


  save() {
    DOMHelper.disableElementById(this.save_btn_id);
    this.occurrences_storage.add(this.occurrence);
    this.navCtrl.pop();
  }

  private addFactorsToOccurrence() {
    for(let factor of this.occurrence.symptom.factors) {
      this.occurrence.factors.push(new FactorInstance(factor, this.comment));
    }
  }

  private retrieveCurrentLocation() {
    this.loadingLocation = true;
    this.locationError = false;
    Geolocation.getCurrentPosition().then((gps_location) => {
      this.occurrence.gps_coordinate = new GPSCoordinates(gps_location.coords);
      this.loadingLocation = false;
    }).catch((error) => {
      this.occurrence.gps_coordinate = null;
      this.loadingLocation = false;
      this.locationError = true;
    });
  }
}
