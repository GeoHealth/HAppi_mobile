import {RestService} from "./rest_service";
import {Injectable} from "@angular/core";
import {Occurrence} from "../../models/occurrence";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {OccurrenceStorage} from "../provider/occurrence_storage"

@Injectable()
export class OccurrenceRestService extends RestService {
  occurrencesPath = 'occurrences';

  constructor(http: Http, private occurrences_storage: OccurrenceStorage) {
    super(http);
  }

  add(occurrence: Occurrence): Observable<{}> {
    occurrence.symptom_id = occurrence.symptom.id;
    let data = JSON.stringify({'occurrence': occurrence});
    return this.http.post(
      this.getFullURL(this.occurrencesPath, null),
      data,
      this.getHeadersForJSON()
    )
      .map(RestService.handlePostResponse)
      .catch(RestService.handleError);
  }

  getAllOccurrences() {
    return this.http.get(this.getFullURL(this.occurrencesPath), this.getHeaders())
      .map(RestService.extractData)
      .catch(RestService.handleError);
  }


  persistAllOccurencesLocally(): Observable<boolean> {
    return Observable.create((observer) => {
      this.getAllOccurrences().subscribe((result) => {
        this.occurrences_storage.addAll(Occurrence.convertObjectsToInstancesArray(result.occurrences));
        observer.next(true);
        observer.complete();
      })
    })
  }

  deleteOccurrence(occurrence: Occurrence): Observable<{}> {
    let parameters = new Map<String, String>([['occurrence_id', occurrence.id]]);
    return this.http.delete(
      this.getFullURL(this.occurrencesPath, parameters),
      this.getHeaders()
    ).map(RestService.handlePostResponse).catch(RestService.handleError);
  }


}
