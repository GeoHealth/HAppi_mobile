import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController, Loading} from 'ionic-angular';
import {AuthService} from '../../app/provider/auth_service';
import {RegisterPage} from '../register/register';
import {TabsPage} from '../tabs/tabs';
import {AuthStorage} from '../../app/provider/auth_storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private auth_storage: AuthStorage) {
    console.log("constructor loginpage");
    this.auth_storage.get().then((val) => {
      debugger;
      console.log(val);
    });
  }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe((allowed) => {
      if (allowed) {
        setTimeout(() => {
          this.loading.dismiss();
          this.nav.setRoot(TabsPage);
        });
      } else {
        this.showError("Invalid login credentials. Please try again.");
      }
    }, (error) => {
      this.showError(error);
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
