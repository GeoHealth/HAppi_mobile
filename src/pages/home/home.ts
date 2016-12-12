import { Component } from '@angular/core';
import {AlertController, ActionSheetController, Platform} from 'ionic-angular';
import {SymptomsStorage} from '../../app/provider/symptoms_storage';
import {OccurrenceStorage} from '../../app/provider/occurrence_storage';
import {Symptom} from '../../models/symptom';
import { NavController } from 'ionic-angular';
import {Occurrence} from '../../models/occurrence';
import { Geolocation } from 'ionic-native';
import {GPSCoordinates} from "../../models/coordinate";
import {DetailedOccurrencePage} from "../detailedoccurrence/detailedoccurrence";
import {DateProvider} from "../../app/provider/date_provider";
import {DOMHelper} from "../../app/domhelper/domhelper";




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  symptom_storage: SymptomsStorage;
  occurrences_storage: OccurrenceStorage;
  private actionSheetCtrl: ActionSheetController;
  private platform: Platform;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, occurrence_storage: OccurrenceStorage, symptoms_storage: SymptomsStorage,
              actionSheetCtrl: ActionSheetController, platform: Platform) {
      this.symptom_storage = symptoms_storage;
      this.occurrences_storage = occurrence_storage;
      this.actionSheetCtrl = actionSheetCtrl;
      this.platform = platform;
    };

    addSymptom(){
      let prompt = this.alertCtrl.create({
        title: 'Add symptom',
        inputs: [{
          name: 'name'
        }],
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Add',
            handler: (data) => {
              let symptom = new Symptom(data.name);
              this.symptom_storage.add(symptom);
              console.log(this.symptom_storage.all());
            }
          }
        ]
      });

      prompt.present();
    };

    createOccurrence(symptom: Symptom){
      let element = DOMHelper.disableElementById(symptom.name);
      let newOccurrence;
      Geolocation.getCurrentPosition().then((gps_location) => {
        newOccurrence = new Occurrence(symptom, DateProvider.getCurrentISODateAsString(), new GPSCoordinates(gps_location.coords), null);
        this.occurrences_storage.add(newOccurrence);
        element.disabled = false;
      }).catch((error) => {
        newOccurrence = new Occurrence(symptom, DateProvider.getCurrentISODateAsString(), null, null);
        this.occurrences_storage.add(newOccurrence);
        console.log('Error getting location', error);
        element.disabled = false;
      });
    };

  createDetailedOccurrence(symptom: Symptom){
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
