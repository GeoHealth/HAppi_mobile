import {Component} from '@angular/core';
import {TranslationProvider} from "../../app/provider/translation_provider";
import {ViewController} from 'ionic-angular';
import {SymptomWithFactor} from '../../models/symptom_with_factors';
import {SymptomRestService} from '../../app/services/symptom_rest_service';

@Component({
  selector: 'page-addsymptom',
  templateUrl: 'addsymptom.html'
})
export class AddSymptomPage {

  items: SymptomWithFactor[];
  header_data:any;


  constructor(public viewCtrl: ViewController, public translation: TranslationProvider,
              public symptom_rest_service: SymptomRestService) {
                this.header_data={title:"Add Symptom"};
  }


  getItems(event: any) {
    this.symptom_rest_service.get(event.target.value).subscribe((response) => {
      this.items = response.symptoms;
    });
  }

  dismiss(symptom: any) {
    // Returning data from the modal:
    this.viewCtrl.dismiss(symptom);
  }

}
