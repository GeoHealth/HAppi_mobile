import { Component } from '@angular/core';
import {NavParams} from 'ionic-angular';
import {OccurenceStorage} from '../../app/provider/occurence_storage';
import {Symptom} from "../../models/symptom";

@Component({
  selector: 'page-detailed-occurence',
  templateUrl: 'detailedoccurence.html'
})
export class DetailedOccurencePage {

  private symptom: Symptom;

  constructor(private navParams: NavParams) {
    this.symptom = navParams.get("symptom");
    console.log(this.symptom);
  }

  save() {

  }

}
