import {RestService} from "./rest_service";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class StatsRestService extends RestService {


  constructor(http: Http) {
    super(http);
  }

  getAverage() {
    return this.http.get('assets/data/stat.json').map(res => res.json());

  }


}
