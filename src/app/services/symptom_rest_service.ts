import {RestService} from "./rest_service";
import {Injectable} from "@angular/core";
import {Occurrence} from "../../models/occurrence";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import {Http} from "@angular/http";

@Injectable()
export class SymptomRestService extends RestService {
  symptomPath = 'symptoms';

  constructor(http: Http) {
    super(http);
  }

  get(name: String) {
    let map = new Map<string,String>([["name", name]]);
    return this.http.get("http://localhost:3000/symptoms")
      .map(RestService.handlePostResponse)
      .catch(RestService.handleError);
  };


}
