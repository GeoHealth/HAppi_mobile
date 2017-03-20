import {RestService} from "./rest_service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class AuthRestService extends RestService {

  createPath = 'auth';
  loginPath = 'auth/sign_in';
  validateTokenPath = 'auth/validate_token';
  disconnectionPath = 'auth/sign_out';

  constructor(http: Http) {
    super(http);
  }

  auth(email: String, password: String): Observable<{}> {
    let data = {'email': email, 'password': password};
    return this.http.post(
      this.getFullURL(this.loginPath, null),
      data,
      this.getHeadersForJSON()
    )
      .map(RestService.handlePostResponse)
      .catch(RestService.handleError);
  }

  create(email: String, password: String, password_confirmation: String, first_name: String, last_name: String, gender: String) {
    let data = {'email': email, 'password': password, 'password_confirmation': password_confirmation, 'first_name': first_name, 'last_name': last_name,
    'gender': gender};
    return this.http.post(
      this.getFullURL(this.createPath, null),
      data,
      this.getHeadersForJSON()
    )
      .map(RestService.handlePostResponse)
      .catch(RestService.handleErrorWithoutParsing);
  }

  validate(headers: Headers) {
    return this.http.get(
      this.getFullURL(this.validateTokenPath, null),
      new RequestOptions({headers: headers})
    )
      .map(RestService.handlePostResponse)
      .catch(RestService.handleError);
  }

  disconnection() {
    return this.http.delete(
      this.getFullURL(this.disconnectionPath, null),
      this.getHeadersForJSON()
    )
      .map(RestService.handlePostResponse)
      .catch(RestService.handleError);
  }

}
