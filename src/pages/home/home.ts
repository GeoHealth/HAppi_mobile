import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import {SymptomsStorage} from '../../app/provider/symptoms_storage'
import {OccurenceStorage} from '../../app/provider/occurence_storage'
import {Symptom} from '../../models/symptom'
import {Occurence} from '../../models/occurence'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  symptom_storage: SymptomsStorage;
  occurences_storage: OccurenceStorage;

  constructor(private alertCtrl: AlertController, occurence_storage: OccurenceStorage) {
    this.symptom_storage = new SymptomsStorage();
    this.occurences_storage = occurence_storage;
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
          handler: data => {
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
    let newOccurence = new Occurence(symptom, new Date().toISOString());
    this.occurences_storage.add(newOccurence);
  };

}
