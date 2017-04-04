import {Component} from "@angular/core";
import {NavParams, NavController, ToastController} from "ionic-angular";
import {OccurrenceStorage} from "../../app/provider/occurrence_storage";
import {Occurrence} from "../../models/occurrence";
import {DateProvider} from "../../app/provider/date_provider";
import {GPSCoordinates} from "../../models/coordinate";
import {Geolocation} from "ionic-native";
import {DOMHelper} from "../../app/domhelper/domhelper";
import {FactorInstance} from "../../models/factor_instance";
import {SymptomWithFactor} from "../../models/symptom_with_factors";
import {TranslationProvider} from "../../app/provider/translation_provider";
import {isNullOrUndefined} from "util";
import {OccurrenceRestService} from "../../app/services/occurrence_rest_service";
import {Crashlytics} from "../../app/services/crashlytics";
import { GPSAnonymizer } from "../../app/services/gps_anonymizer";

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

  constructor(public navCtrl: NavController, private navParams: NavParams, occurrence_storage: OccurrenceStorage, public translation: TranslationProvider,
              public occurrence_rest_service: OccurrenceRestService, private crashlytics: Crashlytics,
              private toastCtrl: ToastController) {
    let symptom = navParams.get("symptom") as SymptomWithFactor;
    this.occurrence = new Occurrence(symptom, DateProvider.getCurrentISODateAsString(), null, null);
    this.occurrences_storage = occurrence_storage;
    this.retrieveCurrentLocation();
    this.addFactorsToOccurrence();
  }


  save() {
    let element = DOMHelper.disableElementById(this.save_btn_id);
    this.occurrence_rest_service.add(this.occurrence).subscribe(
      (res) => {
        this.occurrences_storage.add(this.occurrence);
        this.navCtrl.pop();
      },
      (err) => {
        this.presentToastError();
        this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err.message);
        element.disabled = false;
      }
    );

  }

  private addFactorsToOccurrence() {
    if (!isNullOrUndefined(this.occurrence.symptom.factors)) {
      for (let factor of this.occurrence.symptom.factors) {
        this.occurrence.factors.push(new FactorInstance(factor, this.comment));
      }
    }
  }

  private retrieveCurrentLocation() {
    this.loadingLocation = true;
    this.locationError = false;
    Geolocation.getCurrentPosition({maximumAge: 2000, timeout: 5000}).then((gps_location) => {
      this.occurrence.gps_coordinate = GPSAnonymizer.anonymize_gps_coordinates(new GPSCoordinates(gps_location.coords));
      this.loadingLocation = false;
    }).catch((err) => {
      this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err.message);
      this.occurrence.gps_coordinate = null;
      this.loadingLocation = false;
      this.locationError = true;
    });
  }

  private presentToastError() {
    let toast = this.toastCtrl.create({
      message: 'Error while adding the occurrence',
      duration: 10000,
      position: 'bottom'
    });

    toast.present();
  }
}
