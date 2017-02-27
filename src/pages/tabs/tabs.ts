import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';

import {HomePage} from '../home/home';
import {StatisticPage} from '../statistic/statistic';
import {OccurrencePage} from '../occurrence/occurrence';
import {LoginPage} from '../login/login';

import {AuthService} from '../../app/provider/auth_service';

import {TranslationProvider} from "../../app/provider/translation_provider";
import {GlobalVars} from '../../app/provider/global_vars';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = StatisticPage;
  tab3Root: any = OccurrencePage;

  page_name = "HAppi";

  constructor(public translation: TranslationProvider, private nav: NavController,
          private auth_service: AuthService, public vars: GlobalVars) {
  }

  log_out() {
    this.auth_service.disconnection().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }

}
