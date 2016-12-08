import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OccurenceStorage} from '../../app/provider/occurence_storage';
import {Symptom} from "../../models/symptom";

@Component({
  selector: 'page-detailed-occurence',
  templateUrl: 'detailedoccurence.html'
})
export class DetailedOccurence {

  private symptom: Symptom;

  constructor(public navCtrl: NavController,  private navParams: NavParams) {
    this.symptom = navParams.get("symptom");
    console.log(this.symptom);
  }

}
