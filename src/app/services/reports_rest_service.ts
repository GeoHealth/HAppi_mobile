import {RestService} from "./rest_service";
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class ReportsRestService extends RestService {

  createPath = 'reports';

  constructor(http: Http) {
    super(http);
  }

  create(email: String, start_date: String, end_date, expiration_date: String) {
    let data = {'start_date': start_date, 'end_date': end_date, 'email': email, 'expiration_date': expiration_date};
    return this.http.post(
      this.getFullURL(this.createPath, null),
      data,
      this.getHeadersForJSON()
    )
      .map(RestService.handlePostResponse)
      .catch(RestService.handleErrorWithoutParsing);
  }
}
