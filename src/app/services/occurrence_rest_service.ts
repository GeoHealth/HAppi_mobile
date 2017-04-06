import { RestService } from "./rest_service";
import { Injectable } from "@angular/core";
import { Occurrence } from "../../models/occurrence";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { OccurrenceStorage } from "../provider/occurrence_storage"
import { Crashlytics } from "./crashlytics";

@Injectable()
export class OccurrenceRestService extends RestService {
  occurrencesPath = 'occurrences';

  constructor(http: Http, private occurrences_storage: OccurrenceStorage, crashlytics: Crashlytics) {
    super(http, crashlytics);
  }

  add(occurrence: Occurrence): Observable<{}> {
    occurrence.symptom_id = occurrence.symptom.id;
    let data = JSON.stringify({'occurrence': occurrence});
    return this.http.post(
      this.getFullURLWithVersioning(this.occurrencesPath, null),
      data,
      this.getHeadersForJSON()
    )
      .map(this.handlePostResponse)
      .catch(this.handleError);
  }

  getAllOccurrences() {
    return this.http.get(this.getFullURLWithVersioning(this.occurrencesPath), this.getHeaders())
      .map(this.extractData)
      .catch(this.handleError);
  }


  persistAllOccurencesLocally(): Observable<boolean> {
    return Observable.create((observer) => {
      this.getAllOccurrences().subscribe((result) => {
        this.occurrences_storage.removeAll().subscribe(() => {
          this.occurrences_storage.addAll(Occurrence.convertObjectsToInstancesArray(result.occurrences)).subscribe(() => {
            observer.next(true);
            observer.complete();
          });
        });
      })
    })
  }

  deleteOccurrence(occurrence: Occurrence): Observable<{}> {
    let parameters = new Map<String, String>([['occurrence_id', occurrence.id]]);
    return this.http.delete(
      this.getFullURLWithVersioning(this.occurrencesPath, parameters),
      this.getHeaders()
    ).map(this.handlePostResponse).catch(this.handleError);
  }
}
