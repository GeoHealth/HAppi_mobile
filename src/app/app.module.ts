import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {HAppiApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {StatisticPage} from '../pages/statistic/statistic';
import {OccurrenceStorage} from './provider/occurrence_storage';
import {SymptomsStorage} from './provider/symptoms_storage';
import {OccurrencePage} from '../pages/occurrence/occurrence';
import {TabsPage} from '../pages/tabs/tabs';
import {DetailedOccurrencePage} from "../pages/detailedoccurrence/detailedoccurrence";
import {FactorPainIntensityComponent} from "../pages/detailedoccurrence/factors.components/pain-intensity";
import {OccurrenceRestService} from "./services/occurrence_rest_service";
import {SymptomRestService} from "./services/symptom_rest_service";
import {TranslationProvider} from "./provider/translation_provider";
import {AddSymptomPage} from '../pages/addsymptom/addsymptom';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import {LoginPage} from '../pages/login/login';
import {AuthService} from './provider/auth_service';
import { RegisterPage } from '../pages/register/register';
import {AuthRestService} from './services/auth_rest_service';
import {AuthStorage} from './provider/auth_storage';
import {StatsRestService} from './services/stats_rest_service';
import {CustomHeaderComponent} from '../components/customheader/customheader';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '317959d7'
  }
};

@NgModule({
  declarations: [
    HAppiApp,
    HomePage,
    OccurrencePage,
    StatisticPage,
    TabsPage,
    DetailedOccurrencePage,
    FactorPainIntensityComponent,
    AddSymptomPage,
    LoginPage,
    RegisterPage,
    CustomHeaderComponent

  ],
  imports: [
    IonicModule.forRoot(HAppiApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HAppiApp,
    HomePage,
    OccurrencePage,
    StatisticPage,
    TabsPage,
    DetailedOccurrencePage,
    AddSymptomPage,
    LoginPage,
    RegisterPage,
    CustomHeaderComponent
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  }, OccurrenceStorage, SymptomsStorage, OccurrenceRestService, SymptomRestService, TranslationProvider,
  AuthRestService, AuthService, AuthStorage, StatsRestService]

})
export class AppModule {
}
