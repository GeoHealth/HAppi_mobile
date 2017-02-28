import {Component} from '@angular/core';
import {ActionSheetController, Platform, ModalController, MenuController} from 'ionic-angular';
import {SymptomsStorage} from '../../app/provider/symptoms_storage';
import {OccurrenceStorage} from '../../app/provider/occurrence_storage';
import {Symptom} from '../../models/symptom';
import {NavController} from 'ionic-angular';
import {Occurrence} from '../../models/occurrence';
import {Geolocation} from 'ionic-native';
import {GPSCoordinates} from "../../models/coordinate";
import {DetailedOccurrencePage} from "../detailedoccurrence/detailedoccurrence";
import {DateProvider} from "../../app/provider/date_provider";
import {DOMHelper} from "../../app/domhelper/domhelper";
import {OccurrenceRestService} from "../../app/services/occurrence_rest_service";
import {SymptomWithFactor} from "../../models/symptom_with_factors";
import {TranslationProvider} from "../../app/provider/translation_provider";
import {AddSymptomPage} from "../addsymptom/addsymptom";
import {GlobalVars} from '../../app/provider/global_vars';
import {Crashlytics} from "../../app/services/crashlytics";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  symptom_storage: SymptomsStorage;
  occurrences_storage: OccurrenceStorage;
  private actionSheetCtrl: ActionSheetController;
  private platform: Platform;
  occurrence_rest_service: OccurrenceRestService;

  constructor(public navCtrl: NavController, occurrence_storage: OccurrenceStorage, symptoms_storage: SymptomsStorage,
              actionSheetCtrl: ActionSheetController, platform: Platform, occurrence_rest_service: OccurrenceRestService, public translation: TranslationProvider, public modalCtrl: ModalController,
            private menu: MenuController, public vars: GlobalVars, private crashlytics: Crashlytics) {
    this.symptom_storage = symptoms_storage;
    this.occurrences_storage = occurrence_storage;
    this.actionSheetCtrl = actionSheetCtrl;
    this.platform = platform;
    this.occurrence_rest_service = occurrence_rest_service;
     menu.enable(true);
  };

  ionViewDidEnter() {
    this.vars.setTitle("Home");
  }

  addSymptom() {
    let modal = this.modalCtrl.create(AddSymptomPage);
    modal.onDidDismiss((data) => {
        let symptom = SymptomWithFactor.convertObjectToInstance(data);
        this.symptom_storage.add(symptom);
      }
    );
    modal.present();
  };

  createOccurrence(symptom: SymptomWithFactor) {
    let element = DOMHelper.disableElementById(symptom.id);
    let newOccurrence;
    let callback_success = (res) => {
      element.disabled = false;
    };
    let callback_error = (err) => {
      this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err);
      element.disabled = false;
    };
    let callback_after_location = (gpsCoordinates) => {
      newOccurrence = new Occurrence(symptom, DateProvider.getCurrentISODateAsString(), gpsCoordinates, null);
      this.occurrences_storage.add(newOccurrence);
      this.occurrence_rest_service.add(newOccurrence).subscribe(
        (res) => {
          callback_success(res);
        },
        (err) => {
          callback_error(err);
        }
      );
    };

    Geolocation.getCurrentPosition().then((gps_location) => {
      let gpsCoordinates = new GPSCoordinates(gps_location.coords);
      callback_after_location.call(this, gpsCoordinates);
    }).catch((err) => {
      this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err);
      callback_after_location.call(this, null);
    });
  };

  createDetailedOccurrence(symptom: SymptomWithFactor) {
    this.navCtrl.push(DetailedOccurrencePage, {
      symptom: symptom
    });
  };

  deleteSymptom(symptom: Symptom) {
    this.symptom_storage.remove(symptom);
  }

}
