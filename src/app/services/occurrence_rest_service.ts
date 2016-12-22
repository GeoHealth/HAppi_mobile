import {RestService} from "./rest_service";
import {Injectable} from "@angular/core";
import {Occurrence} from "../../models/occurrence";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";

@Injectable()
export class OccurrenceRestService extends RestService {
  occurrencesPath = 'occurrences';

  constructor(http: Http) {
    super(http);
  }

  add(occurrence: Occurrence): Observable<{}> {
    occurrence.symptom_id = occurrence.symptom.id;
    let data = JSON.stringify(occurrence);

    return this.http.post(
      this.getFullURL(this.occurrencesPath),
      data,
      RestService.generateJSONHeadersOptions()
    )
      .map(RestService.handlePostResponse)
      .catch(RestService.handleError);

  }


}
