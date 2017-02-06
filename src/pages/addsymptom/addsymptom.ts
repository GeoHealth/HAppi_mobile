import {Component} from '@angular/core';
import {OccurrenceStorage} from '../../app/provider/occurrence_storage';
import {TranslationProvider} from "../../app/provider/translation_provider";
import {ViewController} from 'ionic-angular';
import {SymptomWithFactor} from '../../models/symptom_with_factors';
import {Http} from '@angular/http';
import {SymptomRestService} from '../../app/services/symptom_rest_service';

@Component({
  selector: 'page-addsymptom',
  templateUrl: 'addsymptom.html'
})
export class AddSymptomPage {

  items: SymptomWithFactor[]


  constructor(public viewCtrl: ViewController, public translation: TranslationProvider, http: Http,
                public symptom_rest_service: SymptomRestService) {
  }


  getItems(event: any) {
    this.symptom_rest_service.get(event.target.value);
  }

}
