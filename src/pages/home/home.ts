import { Component } from '@angular/core';
import {AlertController, ActionSheetController, Platform} from 'ionic-angular';
import {SymptomsStorage} from '../../app/provider/symptoms_storage';
import {OccurenceStorage} from '../../app/provider/occurence_storage';
import {Symptom} from '../../models/symptom';
import { NavController } from 'ionic-angular';
import {Occurence} from '../../models/occurence';
import { Geolocation } from 'ionic-native';
import {GPSCoordinates} from "../../models/coordinate";
import {DetailedOccurrencePage} from "../detailedoccurence/detailedoccurence";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  symptom_storage: SymptomsStorage;
  occurences_storage: OccurenceStorage;
  private actionSheetCtrl: ActionSheetController;
  private platform: Platform;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, occurence_storage: OccurenceStorage, symptoms_storage: SymptomsStorage,
    actionSheetCtrl: ActionSheetController, platform: Platform) {
      this.symptom_storage = symptoms_storage;
      this.occurences_storage = occurence_storage;
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

    createOccurence(symptom: Symptom){
      let element = document.getElementById(symptom.name) as HTMLInputElement;
      element.disabled = true;
      let newOccurence;
      Geolocation.getCurrentPosition().then((gps_location) => {
        newOccurence = new Occurence(symptom, new Date().toISOString(), new GPSCoordinates(gps_location.coords));
        this.occurences_storage.add(newOccurence);
        element.disabled = false;
      }).catch((error) => {
        newOccurence = new Occurence(symptom, new Date().toISOString(), null);
        this.occurences_storage.add(newOccurence);
        console.log('Error getting location', error);
        element.disabled = false;
      });
    };

  createDetailedOccurence(symptom: Symptom){
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
