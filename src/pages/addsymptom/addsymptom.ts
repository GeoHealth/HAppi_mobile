import {Component} from '@angular/core';
import {TranslationProvider} from "../../app/provider/translation_provider";
import {ViewController} from 'ionic-angular';
import {SymptomWithFactor} from '../../models/symptom_with_factors';
import {SymptomRestService} from '../../app/services/symptom_rest_service';
import {Symptom} from '../../models/symptom';

@Component({
  selector: 'page-addsymptom',
  templateUrl: 'addsymptom.html'
})
export class AddSymptomPage {

  items: SymptomWithFactor[];


  constructor(public viewCtrl: ViewController, public translation: TranslationProvider,
                public symptom_rest_service: SymptomRestService) {
  }


  getItems(event: any) {
    this.symptom_rest_service.get(event.target.value).subscribe(response => {this.items = response.symptoms});
  }

  dismiss(data: any) {
    // Returning data from the modal:
    this.viewCtrl.dismiss(
        data
    );
}

}
