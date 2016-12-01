import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import {SymptomsStorage} from '../../app/provider/symptoms_storage'
import {Symptom} from '../../models/symptom'
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  storage: SymptomsStorage;

  constructor(public navCtrl: NavController,private alertCtrl: AlertController) {
    this.storage = new SymptomsStorage();
  }

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
            this.storage.add(symptom);
            console.log(this.storage.all());
          }
        }
      ]
    });

    prompt.present();
  }

}
