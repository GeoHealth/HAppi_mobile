import {Component} from "@angular/core";
import {OccurrenceStorage} from "../../app/provider/occurrence_storage";
import {TranslationProvider} from "../../app/provider/translation_provider";
import {GlobalVars} from "../../app/provider/global_vars";
import {Occurrence} from "../../models/occurrence";
import {OccurrenceRestService} from "../../app/services/occurrence_rest_service";
import {ToastController} from "ionic-angular";
import {Crashlytics} from "../../app/services/crashlytics";

@Component({
  selector: 'page-occurrence',
  templateUrl: 'occurrence.html'
})
export class OccurrencePage {

  occurrences_storage: OccurrenceStorage;

  constructor(occurrence_storage: OccurrenceStorage, public translation: TranslationProvider, public vars: GlobalVars,
              private occurrences_rest_service: OccurrenceRestService, private toastCtrl: ToastController,
              private crashlytics: Crashlytics) {
    this.occurrences_storage = occurrence_storage;
  }

  ionViewDidEnter() {
    this.vars.setTitle("Occurence");
  }

  deleteOccurrence(occurrence: Occurrence) {
    this.occurrences_rest_service.deleteOccurrence(occurrence).subscribe((result) => {
      this.occurrences_storage.remove(occurrence);
    }, (err) => {
      this.presentToastError();
      this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err.message);
    });
  }

  private presentToastError() {
    let toast = this.toastCtrl.create({
      message: 'Error while deleting the occurrence',
      duration: 10000,
      position: 'bottom'
    });
    toast.present();
  }
}
