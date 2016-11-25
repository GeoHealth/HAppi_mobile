import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {SymptomsStorage} from '../../app/provider/symptoms_storage'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  storage: SymptomsStorage;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
    this.storage = new SymptomsStorage();
  }

  addSymptom(){
    let prompt = this.alertCtrl.create({
      title: 'Add symptom',
      inputs: [{
        name: 'label'
      }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Add',
          handler: data => {
            this.storage.add(data);
          }
        }
      ]
    });

    prompt.present();
  }

}
