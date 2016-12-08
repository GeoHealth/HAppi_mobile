import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HAppiApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {OccurenceStorage} from './provider/occurence_storage';
import {SymptomsStorage} from './provider/symptoms_storage';
import { OccurencePage } from '../pages/occurence/occurence';
import { TabsPage } from '../pages/tabs/tabs';
import {DetailedOccurencePage} from "../pages/detailedoccurence/detailedoccurence";

@NgModule({
  declarations: [
    HAppiApp,
    HomePage,
    OccurencePage,
    TabsPage,
    DetailedOccurencePage
  ],
  imports: [
    IonicModule.forRoot(HAppiApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HAppiApp,
    HomePage,
    OccurencePage,
    TabsPage,
    DetailedOccurencePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, OccurenceStorage, SymptomsStorage]

})
export class AppModule {}
