import { CrashlyticsMock, HttpMock } from "../../mocks";
import { Http } from "@angular/http";
import { Crashlytics } from "../../../app/services/crashlytics";
import { Observable } from "rxjs/Observable";
import { SymptomRestService } from "../../../app/services/symptom_rest_service";

describe("SymptomRestService", () => {
  beforeEach(() => {
    this.symptom_rest_service = new SymptomRestService(new HttpMock() as Http, new CrashlyticsMock() as  Crashlytics);
  });

  describe('get', () => {
    beforeEach(() => {
      spyOn(this.symptom_rest_service.http, "get").and.returnValue(Observable.of({
        "status": 200
      }));
    });

    it('performs a get to /symptoms', () => {
      this.symptom_rest_service.get("name");
      expect(this.symptom_rest_service.http.get).toHaveBeenCalledTimes(1);
    });
  });
});
