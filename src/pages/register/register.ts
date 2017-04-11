import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { AuthService } from "../../app/provider/auth_service";
import { TabsPage } from "../tabs/tabs";
import { Crashlytics } from "../../app/services/crashlytics";
import { TranslationProvider } from "../../app/provider/translation_provider";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = {email: '', password: '', condition: false};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController,
              private crashlytics: Crashlytics, public translation: TranslationProvider) {
  }

  public register() {
    if (this.registerCredentials.condition) {
      this.auth.register(this.registerCredentials).subscribe((res) => {
        if (res.success) {
          this.createSuccess = true;
          this.showPopup(this.translation.gettext("Success"), this.translation.gettext("Account created."));
        } else {
          this.showPopup(this.translation.gettext("Error"), res.msg);
        }
      }, (err) => {
        this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err);
        this.showPopup(this.translation.gettext("Error"), err);
      });
    } else {
      this.showPopup(this.translation.gettext("Error"), this.translation.gettext("You must accept the conditions to use the application !"));
    }
  }

  showCondition() {
    this.showPopup(this.translation.gettext("Conditions"), this.translation.gettext("By registering to this product, I agree that my personal information will be stored and used for an undefined time. I am aware that this service is not yet finished and my data might be lost at any time, without any warning."));
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
