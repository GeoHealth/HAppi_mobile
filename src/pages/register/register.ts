import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {AuthService} from '../../app/provider/auth_service';
import {TabsPage} from '../tabs/tabs';
import {Crashlytics} from "../../app/services/crashlytics";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = {email: '', password: ''};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private crashlytics: Crashlytics) {
  }

  public register() {
    this.auth.register(this.registerCredentials).subscribe((success) => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
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
          text: 'OK',
          handler: (data) => {
            if (this.createSuccess) {
              this.nav.setRoot(TabsPage);
            }
          }
        }
      ]
    });
    alert.present();
  }
}
