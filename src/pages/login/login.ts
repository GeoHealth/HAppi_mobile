import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController, Loading} from 'ionic-angular';
import {AuthService} from '../../app/provider/auth_service';
import {RegisterPage} from '../register/register';
import {TabsPage} from '../tabs/tabs';
import {AuthStorage} from '../../app/provider/auth_storage';
import {Headers} from "@angular/http";
import {isNullOrUndefined} from "util";
import {Crashlytics} from "../../app/services/crashlytics";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    loading: Loading;
    registerCredentials = {email: '', password: ''};

    constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private auth_storage: AuthStorage, private crashlytics: Crashlytics) {
        this.showLoading();
        this.auth_storage.get().then((val: any) => {
            if (!isNullOrUndefined(val) && val.data.length > 0) {
                this.auth.validate(new Headers(val.data[0])).then((res) => {
                  if (res) {
                    this.nav.setRoot(TabsPage);
                  } else {
                    this.auth.disconnection();
                  }
                }
              )


              }
        });
        setTimeout(() => {
            this.loading.dismiss();
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
        }, (err) => {
            this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err);
            this.showError(err);
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
