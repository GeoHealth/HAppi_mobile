import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AuthRestService} from '../services/auth_rest_service';
import {RestService} from '../services/rest_service';
import {Headers, Response} from "@angular/http";
import {AuthStorage} from './auth_storage';

export class User {
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;

  auth_rest_service: AuthRestService;


  constructor(auth_rest_service: AuthRestService, private auth_storage: AuthStorage) {
    this.auth_rest_service = auth_rest_service;
  }

  public extractAndSaveHeaders(res: Response) {
    let needed_headers = ["uid", "access-token", "client", "expiry", "token-type"];
    let headers = res.headers;
    let extracted_headers = new Headers();
    needed_headers.forEach((name) => {
      extracted_headers.append(name, headers.get(name));
    });
    RestService.headers = extracted_headers;
    this.auth_storage.save(extracted_headers);
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create((observer) => {
        this.auth_rest_service.auth(credentials.email, credentials.password).subscribe(
          (res: Response) => {
            this.currentUser = new User(credentials.email);
            this.extractAndSaveHeaders(res);
            observer.next(true);
            observer.complete();
          },
          (err) => {
            (<any>window).fabric.Crashlytics.sendNonFatalCrash(err);
            observer.next(false);
            observer.complete();
          }
        );
      });

    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create((observer) => {
        this.auth_rest_service.create(credentials.email, credentials.password, credentials.password_confirmation).subscribe(
          (res) => {
            this.extractAndSaveHeaders(res);
            observer.next(true);
            observer.complete();
          },
          (err) => {
            (<any>window).fabric.Crashlytics.sendNonFatalCrash(err);
            observer.next(false);
            observer.complete();
          }
        );
      });
    }
  }


  public validate(headers: Headers): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.auth_rest_service.validate(headers).subscribe(
        (res) => {
          let success = JSON.parse(res._body).success;
          if (success) {
            RestService.headers = headers;
          }
          resolve(success);
        },

        (err) => {
          (<any>window).fabric.Crashlytics.sendNonFatalCrash(err);
          resolve(false);
        }
      );
    }).catch((err) => {
      (<any>window).fabric.Crashlytics.sendNonFatalCrash(err);
    });

  }

  public disconnection() {
    return new Promise((resolve, reject) => {
      this.auth_rest_service.disconnection().subscribe(
        (res) => {
          (<any>window).fabric.Crashlytics.sendNonFatalCrash(err);
          this.auth_storage.delete();
          resolve();
        },
        (err) => {
          (<any>window).fabric.Crashlytics.sendNonFatalCrash(err);
        }
      )
    });
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

}
