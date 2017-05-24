import { StatsRestService } from "../../../app/services/stats_rest_service";
import { CrashlyticsMock, HttpMock } from "../../mocks";
import { Http } from "@angular/http";
import { Crashlytics } from "../../../app/services/crashlytics";
import { Observable } from "rxjs/Observable";

describe("StatsRestService", () => {
  beforeEach(() => {
    this.stat_rest_service = new StatsRestService(new HttpMock() as Http, new CrashlyticsMock() as  Crashlytics);
  });

  describe('getCount', () => {
    beforeEach(() => {
      spyOn(this.stat_rest_service.http, "get").and.returnValue(Observable.of({
        "status": 201
      }));
    });

    it('performs a get to /stats/count', () => {
      this.stat_rest_service.getCount("start_date", "end_date", "unit");
      expect(this.stat_rest_service.http.get).toHaveBeenCalledTimes(1);
    });
  });
});
