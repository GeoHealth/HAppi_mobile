import {RestService} from "./rest_service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";

@Injectable()
export class AuthRestService extends RestService {

  createPath = 'auth';
  loginPath = 'auth/sign_in';


  constructor(http: Http) {
    super(http);
  }

  auth(email: String, password: String): Observable<{}> {
    let data = {'email' : email, 'password': password}
    return this.http.post(
      this.getFullURL(this.loginPath, null),
      data,
      RestService.generateJSONHeadersOptions()
    )
      .map(RestService.handlePostResponse)
      .catch(RestService.handleError);
  }

  create(email: String, password: String, password_confirmation: String) {
    let data = {'email': email, 'password': password, 'password_confirmation': password_confirmation}
    return this.http.post(
      this.getFullURL(this.createPath, null),
      data,
      RestService.generateJSONHeadersOptions()
    )
      .map(RestService.handlePostResponse)
      .catch(RestService.handleError);
  }

}
