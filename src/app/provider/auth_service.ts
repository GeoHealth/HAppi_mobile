import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { AuthRestService } from "../services/auth_rest_service";
import { RestService } from "../services/rest_service";
import { Headers, Response } from "@angular/http";
import { AuthStorage } from "./auth_storage";
import { Crashlytics } from "../services/crashlytics";
import { SymptomsStorage } from "./symptoms_storage";
import { OccurrenceStorage } from "./occurrence_storage";

export class User {
  email: string;
  first_name: string;
  last_name: string;
  gender: string;


  constructor(email: string, first_name: string, last_name: string, gender: string) {
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.gender = gender;
  }

}

@Injectable()
export class AuthService {
  private currentUser: User;

  auth_rest_service: AuthRestService;


  constructor(auth_rest_service: AuthRestService, private auth_storage: AuthStorage, private crashlytics: Crashlytics,
              private symptoms_storage: SymptomsStorage, private occurrence_storage: OccurrenceStorage) {
    this.auth_rest_service = auth_rest_service;
    // load user
    this.auth_storage.getUser().then((result: any) => {
      this.currentUser = result.data[0];
    }).catch((err) => {
      this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err);
    });
  }

  public extractAndSaveHeaders(res: Response): Observable<boolean> {
    let needed_headers = ["uid", "access-token", "client", "expiry", "token-type"];
    let headers = res.headers;
    let extracted_headers = new Headers();
    needed_headers.forEach((name) => {
      extracted_headers.append(name, headers.get(name));
    });
    RestService.headers = extracted_headers;
    return this.auth_storage.saveHeaders(extracted_headers);
  }

  public login(credentials): Observable<boolean> {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create((observer) => {
        this.auth_rest_service.auth(credentials.email, credentials.password).subscribe(
          (res: Response) => {
            this.extractAndSaveHeaders(res).subscribe((success) => {
              let user_data = JSON.parse(res['_body']).data;
              this.currentUser = new User(credentials.email, user_data['first_name'], user_data['last_name'], user_data['gender']);
              this.auth_storage.saveUser(this.currentUser).subscribe((success) => {
                this.setCrashlyticsMetadata(res.headers.get('uid'), res.headers.get('uid'), res.headers.get('uid'), res.headers.get('client'));
                this.crashlytics.sendLogin("Direct", true);
                observer.next(true);
                observer.complete();
              });
            });
          },
          (err) => {
            this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err);
            this.crashlytics.sendLogin("Direct", false);
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
        this.auth_rest_service.create(credentials.email, credentials.password, credentials.password_confirmation, credentials.firstName, credentials.lastName, credentials.gender).subscribe(
          (res) => {
            this.extractAndSaveHeaders(res).subscribe((success) => {
              let user_data = JSON.parse(res['_body']).data;
              this.currentUser = new User(credentials.email, user_data['first_name'], user_data['last_name'], user_data['gender']);
              this.auth_storage.saveUser(this.currentUser).subscribe((success) => {
                this.setCrashlyticsMetadata(res.headers.get('uid'), res.headers.get('uid'), res.headers.get('uid'), res.headers.get('client'));
                this.crashlytics.sendSignUp("Direct", true);
                observer.next({success: true});
                observer.complete();
              });
            });
          },
          (err) => {
            this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err);
            this.crashlytics.sendSignUp("Direct", false);
            observer.next({success: false, msg: JSON.parse(err._body).errors.full_messages[0]});
            observer.complete();
          }
        );
      });
    }
  }


  public validateToken(headers: Headers): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.auth_rest_service.validate(headers).subscribe(
        (res) => {
          let success = JSON.parse(res._body).success;
          if (success) {
            RestService.headers = headers;
            this.setCrashlyticsMetadata(headers.get('uid'), headers.get('uid'), headers.get('uid'), headers.get('client'));
            this.crashlytics.sendLogin("token", true);
          }
          resolve(success);
        },

        (err) => {
          this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err);
          this.crashlytics.sendLogin("token", false);
          resolve(false);
        }
      );
    }).catch((err) => {
      this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err);
    });

  }

  public disconnection() {
    return new Promise((resolve, reject) => {
      this.auth_rest_service.disconnection().subscribe(
        (res) => {
          this.auth_storage.deleteHeaders().subscribe(() => {
            this.auth_storage.deleteUser().subscribe(() => {
              this.symptoms_storage.removeAll().subscribe(() => {
                this.occurrence_storage.removeAll().subscribe(() => {
                  this.setCrashlyticsMetadata(null, null, null, null);
                  resolve();
                });
              });
            });
          });
        },
        (err) => {
          this.crashlytics.sendNonFatalCrashWithStacktraceCreation(err);
        })
    });
  }

  public getUserInfo(): User {
    if (!this.currentUser) return new User('loading', 'loading', 'loading', 'loading');
    else return this.currentUser;
  }

  private setCrashlyticsMetadata(uid: string, user_name: string, email: string, client: string) {
    this.crashlytics.setUserIdentifier(uid);
    this.crashlytics.setUserName(user_name);
    this.crashlytics.setUserEmail(email);
    this.crashlytics.setStringValueForKey('client', client);
  }

}
