import {Component, ViewChild} from "@angular/core";
import {GlobalVars} from "../../app/provider/global_vars";
import * as moment from "moment";

@Component({
  selector: 'page-sharereport',
  templateUrl: 'sharereport.html'
})
export class ShareReportPage {


  reportInformations = {doctor_email: '', start_date: '', end_date: '', expiration_date: ''};
  test: any;

  constructor(public vars: GlobalVars) {
    this.reportInformations.end_date = moment().format('YYYY-MM-DD');
    this.reportInformations.expiration_date = moment().add(14, 'days').format('YYYY-MM-DD');

  }

  ionViewDidEnter() {
    this.vars.setTitle("Share Report");
  }

}
