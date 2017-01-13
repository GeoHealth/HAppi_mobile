import {Component} from '@angular/core';
import {AlertController, ActionSheetController, Platform} from 'ionic-angular';
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
import {Factor} from "../../models/factor";
import {TranslationProvider} from "../../app/provider/translation_provider";


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

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, occurrence_storage: OccurrenceStorage, symptoms_storage: SymptomsStorage,
              actionSheetCtrl: ActionSheetController, platform: Platform, occurrence_rest_service: OccurrenceRestService, public translation: TranslationProvider) {
    this.symptom_storage = symptoms_storage;
    this.occurrences_storage = occurrence_storage;
    this.actionSheetCtrl = actionSheetCtrl;
    this.platform = platform;
    this.occurrence_rest_service = occurrence_rest_service;
  };

  addSymptom() {
    let prompt = this.alertCtrl.create({
      title: 'Add symptom',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            let symptom = new SymptomWithFactor(data.name);
            symptom.factors.push(new Factor('pain intensity', 'pain_intensity'));
            this.symptom_storage.add(symptom);
            console.log(this.symptom_storage.all());
          }
        }
      ]
    });

    prompt.present();
  };

  createOccurrence(symptom: SymptomWithFactor) {
    let element = DOMHelper.disableElementById(symptom.name);
    let newOccurrence;
    let callback_success = (res) => {
      element.disabled = false;
    };
    let callback_error = (err) => {
      element.disabled = false;
    };
    let callback_after_location = (gpsCoordinates) => {
      symptom.id = '2';
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
      callback_after_location.call(this, null);
    });
  };

  createDetailedOccurrence(symptom: SymptomWithFactor) {
    this.navCtrl.push(DetailedOccurrencePage, {
      symptom: symptom
    });
  };

  openLongPressMenu(symptom: Symptom) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Symptom',
      cssClass: 'long-press-symptom-menu',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete symptom clicked');
            console.log(symptom.name);
            this.deleteSymptom(symptom);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  private deleteSymptom(symptom: Symptom) {
    this.symptom_storage.remove(symptom);
  }

}
