import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  symptoms : any;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
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
          }
        }
      ]
    });

    prompt.present();
  }

}
