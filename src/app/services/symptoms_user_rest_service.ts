import { RestService } from "./rest_service";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Symptom } from "../../models/symptom";
import { Observable } from "rxjs";
import { SymptomsStorage } from "../provider/symptoms_storage";
import { SymptomWithFactor } from "../../models/symptom_with_factors";
import { Crashlytics } from "./crashlytics";

@Injectable()
export class SymptomsUserRestService extends RestService {
  symptoms_user_path = 'symptoms_user';

  constructor(http: Http, private symptoms_storage: SymptomsStorage, crashlytics: Crashlytics) {
    super(http, crashlytics);
  }

  getAllSymptoms() {
    return this.http.get(this.getFullURLWithVersioning(this.symptoms_user_path, null), this.getHeaders())
      .map(this.extractData)
      .catch(this.handleError);
  };

  addSymptom(symptom: Symptom): Observable<{}> {
    let data = JSON.stringify({'symptom_id': symptom.id});
    return this.http.post(
      this.getFullURLWithVersioning(this.symptoms_user_path, null),
      data,
      this.getHeadersForJSON()
    ).map(this.handlePostResponse).catch(this.handleError);
  }

  deleteSymptom(symptom: Symptom): Observable<{}> {
    let parameters = new Map<String, String>([['symptom_id', symptom.id]]);
    return this.http.delete(
      this.getFullURLWithVersioning(this.symptoms_user_path, parameters),
      this.getHeaders()
    ).map(this.handlePostResponse).catch(this.handleError);
  }

  persistAllSymptomsLocally(): Observable<boolean> {
    return Observable.create((observer) => {
      this.getAllSymptoms().subscribe((result) => {
        this.symptoms_storage.removeAll().subscribe(() => {
          this.symptoms_storage.addAll(SymptomWithFactor.convertObjectsToInstancesArray(result.symptoms)).subscribe(() => {
            observer.next(true);
            observer.complete();
          });
        });
      });
    });
  }
}
