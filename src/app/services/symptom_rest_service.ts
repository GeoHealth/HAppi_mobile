import {RestService} from "./rest_service";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class SymptomRestService extends RestService {
  symptomPath = 'symptoms';

  constructor(http: Http) {
    super(http);
  }

  get(name: String) {
    let parameters = new Map<String,String>([['name', name]]);
    return this.http.get(this.getFullURL(this.symptomPath, parameters))
      .map(RestService.extractData)
      .catch(RestService.handleError);
  };


}
