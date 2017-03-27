import {Component, ViewChild} from "@angular/core";
import {NavController, Tabs} from "ionic-angular";
import {HomePage} from "../home/home";
import {StatisticPage} from "../statistic/statistic";
import {OccurrencePage} from "../occurrence/occurrence";
import {LoginPage} from "../login/login";
import {AuthService} from "../../app/provider/auth_service";
import {TranslationProvider} from "../../app/provider/translation_provider";
import {GlobalVars} from "../../app/provider/global_vars";
import {ShareReportPage} from "../sharereport/sharereport";


@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  @ViewChild('tabs') tabRef: Tabs;


  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = StatisticPage;
  tab3Root: any = OccurrencePage;
  tab4Root: any = ShareReportPage;


  page_name = "HAppi";

  constructor(public translation: TranslationProvider, private nav: NavController,
              public auth_service: AuthService, public vars: GlobalVars) {
  }


  showShareReport() {
    this.tabRef.select(3);
  }

  log_out() {
    this.auth_service.disconnection().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }

}
