import { ReportsRestService } from "../../../app/services/reports_rest_service";
import { CrashlyticsMock, HttpMock } from "../../mocks";
import { Http } from "@angular/http";
import { Crashlytics } from "../../../app/services/crashlytics";
import { Observable } from "rxjs/Observable";

describe('ReportsRestService', () => {
  beforeEach(() => {
    this.report_rest_service = new ReportsRestService(new HttpMock() as Http, new CrashlyticsMock() as Crashlytics);
  });

  describe('#create', () => {
    beforeEach(() => {
      spyOn(this.report_rest_service.http, "post").and.returnValue(Observable.of({
        "status": 200
      }));
    });

    it('performs a post to /reports', () => {
      this.report_rest_service.create("email", "start_date", "end_date", "expiration_date");
      expect(this.report_rest_service.http.post).toHaveBeenCalledWith(
        "http://test.com:80/reports",
        {'start_date': "start_date", 'end_date': "end_date", 'email': "email", 'expiration_date': "expiration_date"},
        this.report_rest_service.getHeadersForJSON());
    });
  });
});
