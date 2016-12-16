import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Headers, RequestOptions, Http, Response} from "@angular/http";

@Injectable()
export class RestService {
  http: Http;
  apiDomainName = 'localhost';
  apiPort = '3000';
  apiVersion = ''; // will be 'v1', 'v2', ... in the future but for now leave it blank.

  constructor(http: Http) {
    this.http = http;
  }

  /**
   * Return the URL of the REST API. It always ends with a '/'
   * @returns {string} example: localhost:3000/v1/
   */
  getBaseURL(): string {
    return 'http://' + this.apiDomainName + ':' + this.apiPort + '/';
  }

  /**
   * Return the base URL plus the given path
   * @param path a path (bot starting with a '/')
   * @returns {string}
   */
  getFullURL(path): string {
    return this.getBaseURL() + path;
  }

  /**
   * Return a simple headers options for JSON content
   * @returns {RequestOptions}
   */
  generateJSONHeadersOptions(): RequestOptions {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});
    return options;
  }

  handlePostResponse(res: Response) {
    console.log('success', res); //TODO remove before commit
    return {};
  }

  handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error('error', errMsg); //TODO remove ça aussi :-O
    return Observable.throw(errMsg);
  }


}
