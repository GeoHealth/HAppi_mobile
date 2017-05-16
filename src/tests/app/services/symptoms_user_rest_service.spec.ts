import { CrashlyticsMock, HttpMock, SymptomsStorageMock } from "../../mocks";
import { Http } from "@angular/http";
import { Crashlytics } from "../../../app/services/crashlytics";
import { Observable } from "rxjs/Observable";
import { SymptomsUserRestService } from "../../../app/services/symptoms_user_rest_service";
import { SymptomsStorage } from "../../../app/provider/symptoms_storage";

describe("SymptomsUserRestService", () => {
  beforeEach(() => {
    this.symptom_user = new SymptomsUserRestService(new HttpMock() as Http, new SymptomsStorageMock() as SymptomsStorage, new CrashlyticsMock() as  Crashlytics);
  });

  describe('getAllSymptoms', () => {
    beforeEach(() => {
      spyOn(this.symptom_user.http, "get").and.returnValue(Observable.of({
        "status": 200
      }));
    });

    it('performs a get to /symptoms_user', () => {
      this.symptom_user.getAllSymptoms();
      expect(this.symptom_user.http.get).toHaveBeenCalledWith("http://test.com:80/v1/symptoms_user", this.symptom_user.getHeaders());
    });
  });
});
