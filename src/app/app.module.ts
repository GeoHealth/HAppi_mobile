import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HAppiApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {OccurenceStorage} from './provider/occurence_storage'
import {SymptomsStorage} from './provider/symptoms_storage'
import { OccurencePage } from '../pages/occurence/occurence';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    HAppiApp,
    HomePage,
    OccurencePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(HAppiApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HAppiApp,
    HomePage,
    OccurencePage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, OccurenceStorage, SymptomsStorage]

})
export class AppModule {}
