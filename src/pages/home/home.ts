import { Component } from "@angular/core";
import {
  ActionSheetController, Platform, ModalController, MenuController, NavController,
  ToastController
} from "ionic-angular";
import { SymptomsStorage } from "../../app/provider/symptoms_storage";
import { OccurrenceStorage } from "../../app/provider/occurrence_storage";
import { Symptom } from "../../models/symptom";
import { Occurrence } from "../../models/occurrence";
import { Geolocation } from "ionic-native";
import { GPSCoordinates } from "../../models/coordinate";
import { DetailedOccurrencePage } from "../detailedoccurrence/detailedoccurrence";
import { DateProvider } from "../../app/provider/date_provider";
import { DOMHelper } from "../../app/domhelper/domhelper";
import { OccurrenceRestService } from "../../app/services/occurrence_rest_service";
import { SymptomWithFactor } from "../../models/symptom_with_factors";
import { TranslationProvider } from "../../app/provider/translation_provider";
import { AddSymptomPage } from "../addsymptom/addsymptom";
import { GlobalVars } from "../../app/provider/global_vars";
import { Crashlytics } from "../../app/services/crashlytics";
import { SymptomsUserRestService } from "../../app/services/symptoms_user_rest_service";
import { GPSAnonymizer } from "../../app/services/gps_anonymizer";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  symptom_storage: SymptomsStorage;
  occurrences_storage: OccurrenceStorage;
  occurrence_rest_service: OccurrenceRestService;

  private actionSheetCtrl: ActionSheetController;
  private platform: Platform;

  constructor(public navCtrl: NavController, occurrence_storage: OccurrenceStorage, symptoms_storage: SymptomsStorage,
              actionSheetCtrl: ActionSheetController, platform: Platform, occurrence_rest_service: OccurrenceRestService,
              public translation: TranslationProvider, public modalCtrl: ModalController,
              private menu: MenuController, public vars: GlobalVars, private crashlytics: Crashlytics,
              private symptoms_user_rest_service: SymptomsUserRestService,
              private toastCtrl: ToastController) {
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
        try {
          let symptom = SymptomWithFactor.convertObjectToInstance(data);
          this.symptoms_user_rest_service.addSymptom(symptom).subscribe((result) => {
            this.symptom_storage.add(symptom).subscribe();
          });
        } catch (err) {
          this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err.message);
        }
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
      this.presentToastError();
      this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err.message);
      element.disabled = false;
    };
    let callback_after_location = (gpsCoordinates) => {
      newOccurrence = new Occurrence(symptom, DateProvider.getCurrentISODateAsString(), gpsCoordinates, null);

      this.occurrence_rest_service.add(newOccurrence).subscribe(
        (res) => {
          callback_success(res);
          let resultOccurrence = Occurrence.convertObjectToInstance(JSON.parse(res['_body']));
          this.occurrences_storage.add(resultOccurrence).subscribe();
        },
        (err) => {
          callback_error(err);
        }
      );
    };

    Geolocation.getCurrentPosition({maximumAge: 2000, timeout: 5000}).then((gps_location) => {
      let gpsCoordinates = GPSAnonymizer.anonymize_gps_coordinates(new GPSCoordinates(gps_location.coords));
      callback_after_location.call(this, gpsCoordinates);
    }).catch((err) => {
      this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err.message + ': Cannot retrieve current GPS position');
      callback_after_location.call(this, null);
    });
  };

  createDetailedOccurrence(symptom: SymptomWithFactor) {
    this.navCtrl.push(DetailedOccurrencePage, {
      symptom: symptom
    });
  };

  deleteSymptom(symptom: Symptom) {
    this.symptoms_user_rest_service.deleteSymptom(symptom).subscribe((result) => {
      this.symptom_storage.remove(symptom).subscribe();
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
