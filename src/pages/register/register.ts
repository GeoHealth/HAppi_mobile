import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {AuthService} from "../../app/provider/auth_service";
import {TabsPage} from "../tabs/tabs";
import {Crashlytics} from "../../app/services/crashlytics";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = {email: '', password: '', condition: false};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private crashlytics: Crashlytics) {
  }

  public register() {
    if (this.registerCredentials.condition) {
      this.auth.register(this.registerCredentials).subscribe((res) => {
        if (res.success) {
          this.createSuccess = true;
          this.showPopup("Success", "Account created.");
        } else {
          this.showPopup("Error", res.msg);
        }
      }, (err) => {
        this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err);
        this.showPopup("Error", err);
      });
    } else {
      this.showPopup("Error", "You must accept the conditions to use the application !");
    }
  }

  showCondition() {
    this.showPopup("Conditions", "J'accepte que mes données personnelles soient enregistrer et utilisées");
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
