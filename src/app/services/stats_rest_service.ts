import {RestService} from "./rest_service";
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class StatsRestService extends RestService {

  countPath = "stats/count";

  constructor(http: Http) {
    super(http);
  }

  getCount (start_date: any, end_date: any, unit: any) {
    let data = new Map();
    data.set("start", start_date);
    data.set("end", end_date);
    data.set("unit", unit);
    return this.http.get(
      this.getFullURL(this.countPath, data),
      this.getHeaders()
    )
    .map(RestService.extractData)
    .catch(RestService.handleError);
  }


}
