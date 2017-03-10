import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Headers, RequestOptions, Http, Response} from "@angular/http";
import {isNullOrUndefined} from "util";

@Injectable()
export class RestService {
  http: Http;
  protocol = 'http://';
  apiDomainName = 'localhost';
  apiPort = '3000';
  static headers: Headers;

  constructor(http: Http) {
    this.http = http;
  }

  /**
   * Return the URL of the REST API. It always ends with a '/'
   * @returns {string} example: localhost:3000/v1/
   */
  getBaseURL(): string {
    return this.protocol + this.apiDomainName + ':' + this.apiPort + '/';
  }

  /**
   * Return the base URL plus the given path
   * @param path a path (not starting with a '/')
   * @param parameters map of parameters
   * @returns {string}
   */
  getFullURL(path: String, parameters?: Map<String, String>): string {
    let fullURL = this.getBaseURL() + path;
    if (!isNullOrUndefined(parameters)) {
      fullURL += '?';
      parameters.forEach((value: String, key: String) => {
        fullURL += key + '=' + value + '&';
      });
    }
    return fullURL;
  }

  getHeaders(): RequestOptions {
    return new RequestOptions({headers: RestService.headers});
  }

  /**
   * Return a simple headers options for JSON content
   * @returns {Headers}
   */
  getHeadersForJSON(): RequestOptions {
    let json_headers = new Headers(RestService.headers);
    json_headers.append('Content-Type', 'application/json');
    return new RequestOptions({headers: json_headers});
  }

  static handlePostResponse(res: Response) {
    return res;
  }

  static extractData(res: Response) {
    return res.json() || {};
  }

  static handleError(error: Response | any) {
    try {
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      (<any>window).fabric.sendNonFatalCrashWithStacktraceCreation(errMsg);
      return Observable.throw(errMsg);
    } catch (e) {
      return Observable.throw(error);
    }
  }

  static handleErrorWithoutParsing(error: Response | any) {
    return Observable.throw(error);
  }


}
