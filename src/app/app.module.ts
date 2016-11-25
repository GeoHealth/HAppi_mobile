import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HAppiApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    HAppiApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(HAppiApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HAppiApp,
    HomePage
  ],
  providers: []
})
export class AppModule {}
