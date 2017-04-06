import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Headers, RequestOptions, Http, Response} from "@angular/http";
import {isNullOrUndefined} from "util";
import { Crashlytics } from "./crashlytics";

declare const ENV;

@Injectable()
export class RestService {
  http: Http;
  protocol = ENV.protocol;
  apiDomainName = ENV.apiDomainName;
  apiPort = ENV.apiPort;
  apiVersion = ENV.apiVersion;
  static headers: Headers;

  constructor(http: Http, private crashlytics: Crashlytics) {
    this.http = http;
  }

  /**
   * Return the URL of the REST API excluding the version. It always ends with a '/'
   * @returns {string} example: localhost:3000/
   */
  public getBaseURL(): string {
    return this.protocol + this.apiDomainName + ':' + this.apiPort + '/';
  }

  /**
   * Return the URL of the REST API. It always ends with a '/'
   * @returns {string} example: localhost:3000/v1/
   */
  public getBaseURLWithVersioning(): string {
    return this.getBaseURL() + this.apiVersion + '/';
  }

  /**
   * Return the base URL plus the given path
   * @param path a path (not starting with a '/')
   * @param parameters map of parameters
   * @returns {string}
   */
  public getFullURL(path: String, parameters?: Map<String, String>): string {
    let fullURL = this.getBaseURL() + path;
    return this.appendParametersToURL(parameters, fullURL);
  }

  /**
   * Return the base URL, including the version, plus the given path
   * @param path a path (not starting with a '/')
   * @param parameters map of parameters
   * @returns {string}
   */
  public getFullURLWithVersioning(path: String, parameters?: Map<String, String>): string {
    let fullURL = this.getBaseURLWithVersioning() + path;
    return this.appendParametersToURL(parameters, fullURL);
  }

  public getHeaders(): RequestOptions {
    return new RequestOptions({headers: RestService.headers});
  }

  /**
   * Return a simple headers options for JSON content
   * @returns {Headers}
   */
  public getHeadersForJSON(): RequestOptions {
    let json_headers = new Headers(RestService.headers);
    json_headers.append('Content-Type', 'application/json');
    return new RequestOptions({headers: json_headers});
  }

  public handlePostResponse(res: Response) {
    return res;
  }

  public extractData(res: Response) {
    return res.json() || {};
  }

  public handleError(error: Response | any) {
    try {
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      this.crashlytics.sendNonFatalCrashWithStacktraceCreation(errMsg);
      return Observable.throw(errMsg);
    } catch (e) {
      return Observable.throw(error);
    }
  }

  public handleErrorWithoutParsing(error: Response | any) {
    return Observable.throw(error);
  }

  private appendParametersToURL(parameters: Map<String, String>, fullURL: string) {
    if (!isNullOrUndefined(parameters)) {
      fullURL += '?';
      parameters.forEach((value: String, key: String) => {
        fullURL += key + '=' + value + '&';
      });
    }
    return fullURL;
  }

}
