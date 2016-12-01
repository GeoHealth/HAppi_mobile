import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import {SymptomsStorage} from '../../app/provider/symptoms_storage'
import {OccurenceStorage} from '../../app/provider/occurence_storage'
import {Symptom} from '../../models/symptom'
<<<<<<< HEAD
import { NavController } from 'ionic-angular';
=======
import {Occurence} from '../../models/occurence'
>>>>>>> 5a1f5d6ff3a4fa872839dd616c76b85be40d96ed

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  symptom_storage: SymptomsStorage;
  occurences_storage: OccurenceStorage;

<<<<<<< HEAD
  constructor(public navCtrl: NavController,private alertCtrl: AlertController) {
    this.storage = new SymptomsStorage();
  }
=======
  constructor(private alertCtrl: AlertController) {
    this.symptom_storage = new SymptomsStorage();
    this.occurences_storage = new OccurenceStorage();
  };
>>>>>>> 5a1f5d6ff3a4fa872839dd616c76b85be40d96ed

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
