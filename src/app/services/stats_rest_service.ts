import { RestService } from "./rest_service";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Crashlytics } from "./crashlytics";

@Injectable()
export class StatsRestService extends RestService {

  countPath = "stats/count";

  constructor(http: Http, crashlytics: Crashlytics) {
    super(http, crashlytics);
  }

  getCount(start_date: any, end_date: any, unit: any) {
    let data = new Map();
    data.set("start", start_date);
    data.set("end", end_date);
    data.set("unit", unit);
    return this.http.get(
      this.getFullURLWithVersioning(this.countPath, data),
      this.getHeaders()
    )
      .map(this.extractData)
      .catch(this.handleError);
  }


}
