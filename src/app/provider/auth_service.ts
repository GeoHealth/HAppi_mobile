import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AuthRestService} from '../services/auth_rest_service';

export class User {
  name: string;
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;

  auth_rest_service: AuthRestService;


  constructor(auth_rest_service: AuthRestService) {
    this.auth_rest_service = auth_rest_service;
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.auth_rest_service.auth(credentials.email, credentials.password).subscribe(
          (res) => {
            this.currentUser = new User(credentials.email);
            observer.next(true);
            observer.complete();
          },
          (err) => {
            observer.next(false);
            observer.complete();
          }
        )
      });

    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.auth_rest_service.create(credentials.email, credentials.password, credentials.password).subscribe(
          (res) => {
            observer.next(true);
            observer.complete();
          },
          (err) => {
            observer.next(false);
            observer.complete();
          }
        );
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
