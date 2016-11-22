import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {Storage} from '../../app/provider/sqlstorage'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  symptoms : any;
  private storage: Storage;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
    this.storage = new Storage();

    this.symptoms = [
      {label: 'Headache'},
      {label: 'Fever'},
      {label: 'Diarrhea'}
    ];
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
            this.symptoms.push(data);
            this.storage.add(data);
          }
        }
      ]
    });

    prompt.present();
  }

}
