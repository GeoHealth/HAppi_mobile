import { Component } from "@angular/core";
import { GlobalVars } from "../../app/provider/global_vars";
import * as moment from "moment";
import { ReportsRestService } from "../../app/services/reports_rest_service";
import { AlertController } from "ionic-angular";
import { Crashlytics } from "../../app/services/crashlytics";
import { TranslationProvider } from "../../app/provider/translation_provider";

@Component({
  selector: 'page-sharereport',
  templateUrl: 'sharereport.html'
})
export class ShareReportPage {

  createSuccess = false;
  reportInformations = {doctor_email: '', start_date: '', end_date: '', expiration_date: ''};
  test: any;

  constructor(public vars: GlobalVars, private reports_rest_service: ReportsRestService, private alertCtrl: AlertController,
              private crashlytics: Crashlytics, private translation: TranslationProvider) {
    this.reportInformations.end_date = moment().add(1, 'days').format('YYYY-MM-DD');
    this.reportInformations.expiration_date = moment().add(14, 'days').format('YYYY-MM-DD');

  }

  ionViewDidEnter() {
    this.vars.setTitle(this.translation.gettext("Share Report"));
  }

  public sendReport() {
    this.reports_rest_service.create(
      this.reportInformations.doctor_email,
      this.reportInformations.start_date,
      this.reportInformations.end_date,
      this.reportInformations.expiration_date
    ).subscribe(
      (res) => {
        this.createSuccess = true;
        this.showPopup(this.translation.gettext("Success"), this.translation.gettext("Symptoms correctly send"));
      },
      (err) => {
        this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err);
        this.showPopup(this.translation.gettext("Error"), err);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present();
  }

}
