import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HAppiApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatisticPage } from '../pages/statistic/statistic';
import {OccurrenceStorage} from './provider/occurrence_storage';
import {SymptomsStorage} from './provider/symptoms_storage';
import { OccurrencePage } from '../pages/occurrence/occurrence';
import { TabsPage } from '../pages/tabs/tabs';
import {DetailedOccurrencePage} from "../pages/detailedoccurrence/detailedoccurrence";
import {FactorPainIntensityComponent} from "../pages/detailedoccurrence/factors.components/pain-intensity";

@NgModule({
  declarations: [
    HAppiApp,
    HomePage,
    OccurrencePage,
    StatisticPage,
    TabsPage,
    DetailedOccurrencePage,
    FactorPainIntensityComponent
  ],
  imports: [
    IonicModule.forRoot(HAppiApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HAppiApp,
    HomePage,
    OccurrencePage,
    StatisticPage,
    TabsPage,
    DetailedOccurrencePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, OccurrenceStorage, SymptomsStorage]

})
export class AppModule {}
