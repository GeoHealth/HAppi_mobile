import {RestService} from "./rest_service";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import { Crashlytics } from "./crashlytics";

@Injectable()
export class SymptomRestService extends RestService {
  symptomPath = 'symptoms';

  constructor(http: Http, crashlytics: Crashlytics) {
    super(http, crashlytics);
  }

  get(name: String) {
    let parameters = new Map<String, String>([['name', name]]);
    return this.http.get(this.getFullURLWithVersioning(this.symptomPath, parameters), this.getHeaders())
      .map(this.extractData)
      .catch(this.handleError);
  };


}
