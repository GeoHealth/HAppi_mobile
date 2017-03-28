import {Component} from "@angular/core";
import {GlobalVars} from "../../app/provider/global_vars";
import * as moment from "moment";
import {ReportsRestService} from "../../app/services/reports_rest_service";
import {AlertController} from "ionic-angular";
import {Crashlytics} from "../../app/services/crashlytics";

@Component({
  selector: 'page-sharereport',
  templateUrl: 'sharereport.html'
})
export class ShareReportPage {

  createSuccess = false;
  reportInformations = {doctor_email: '', start_date: '', end_date: '', expiration_date: ''};
  test: any;

  constructor(public vars: GlobalVars, private reports_rest_service: ReportsRestService, private alertCtrl: AlertController, private crashlytics: Crashlytics) {
    this.reportInformations.end_date = moment().format('YYYY-MM-DD');
    this.reportInformations.expiration_date = moment().add(14, 'days').format('YYYY-MM-DD');

  }

  ionViewDidEnter() {
    this.vars.setTitle("Share Report");
  }

  public sendReport() {
    this.reports_rest_service.create(this.reportInformations.doctor_email, this.reportInformations.start_date, this.reportInformations.end_date, this.reportInformations.expiration_date).subscribe((res) => {
      this.createSuccess = true;
      this.showPopup("Success", "Symptoms correctly send");
    }, (err) => {
      this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err);
      this.showPopup("Error", err);
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
