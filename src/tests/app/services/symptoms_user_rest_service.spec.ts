import { CrashlyticsMock, HttpMock, SymptomsStorageMock } from "../../mocks";
import { Http } from "@angular/http";
import { Crashlytics } from "../../../app/services/crashlytics";
import { Observable } from "rxjs/Observable";
import { SymptomsUserRestService } from "../../../app/services/symptoms_user_rest_service";
import { SymptomsStorage } from "../../../app/provider/symptoms_storage";
import { Symptom } from "../../../models/symptom";

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

  describe('addSymptom', () => {
    beforeEach(() => {
      spyOn(this.symptom_user.http, "post").and.returnValue(Observable.of({
        "status": 201
      }));
    });

    it('performs a post to /symptoms_user', () => {
      let symptomToAdd = new Symptom("name");
      symptomToAdd.id = "1";
      this.symptom_user.addSymptom(symptomToAdd);
      expect(this.symptom_user.http.post).toHaveBeenCalledWith("http://test.com:80/v1/symptoms_user",JSON.stringify({'symptom_id': symptomToAdd.id}), this.symptom_user.getHeadersForJSON());
    });
  });

  describe('deleteSymptom', () => {
    beforeEach(() => {
      spyOn(this.symptom_user.http, "delete").and.returnValue(Observable.of({
        "status": 200
      }));
    });

    it('performs a delete to /symptoms_user', () => {
      let symptomToDelete = new Symptom("name");
      symptomToDelete.id = "1";
      this.symptom_user.deleteSymptom(symptomToDelete);
      expect(this.symptom_user.http.delete).toHaveBeenCalledWith("http://test.com:80/v1/symptoms_user?symptom_id=1&", this.symptom_user.getHeaders());
    });
  });

  describe('persistAllSymptomsLocally', () => {
    it('calls getAllSymptoms, removeAll and then addAll', (done) => {
      spyOn(this.symptom_user, "getAllSymptoms").and.returnValue(Observable.of({symptoms: []}));
      spyOn(this.symptom_user["symptoms_storage"], "removeAll").and.returnValue(Observable.of({}));
      spyOn(this.symptom_user["symptoms_storage"], "addAll").and.returnValue(Observable.of({}));

      this.symptom_user.persistAllSymptomsLocally().subscribe(() => {
        expect(this.symptom_user.getAllSymptoms).toHaveBeenCalled();
        expect(this.symptom_user["symptoms_storage"].removeAll).toHaveBeenCalled();
        expect(this.symptom_user["symptoms_storage"].addAll).toHaveBeenCalled();
        done();
      });
    });
  });
});
