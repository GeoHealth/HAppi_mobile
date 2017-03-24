import {RestService} from "../../../app/services/rest_service";
import {RequestOptions} from "@angular/http";

declare const ENV;


describe('RestService', () => {
  beforeEach(() => {
    ENV.protocol = "http";
    ENV.apiDomainName = "localhost";
    ENV.apiPort = "3000";
    ENV.apiVersion = "v1";
    this.rest_service = new RestService(null);
  });

  describe('#getBaseURL', () => {
    it('returns "protocol" + domain + ":" + port + "/"', () => {
      let expect_url = this.rest_service.protocol + this.rest_service.apiDomainName + ":" + this.rest_service.apiPort + '/';
      expect(this.rest_service.getBaseURL()).toEqual(expect_url);
    });
  });

  describe('#getFullURL', () => {
    describe('when no parameters are given', () => {
      it('returns the base url + path', () => {
        let base_url = this.rest_service.getBaseURL();
        let path = "path";
        let expect_url = base_url + path;
        expect(this.rest_service.getFullURL(path)).toEqual(expect_url);
      });
    });

    describe('when name=test are given as parameter', () => {
      it('returns the base url + path + parameters', () => {
        let base_url = this.rest_service.getBaseURL();
        let path = "path";
        let parameters = new Map<String, String>([['name', 'test']]);
        let expect_url = base_url + path + '?name=test&';
        expect(this.rest_service.getFullURL(path, parameters)).toEqual(expect_url);
      });
    });
  });

  describe('#getBaseURLWithVersioning', () => {
    it('returns "protocol" + domain + ":" + port + "/" + version + "/"', () => {
      let expect_url = this.rest_service.protocol + this.rest_service.apiDomainName + ":" + this.rest_service.apiPort + "/" + this.rest_service.apiVersion + '/';
      expect(this.rest_service.getBaseURLWithVersioning()).toEqual(expect_url);
    });
  });

  describe('#getFullURLWithVersioning', () => {
    describe('when no parameters are given', () => {
      it('returns the base url + path', () => {
        let base_url = this.rest_service.getBaseURLWithVersioning();
        let path = "path";
        let expect_url = base_url + path;
        expect(this.rest_service.getFullURLWithVersioning(path)).toEqual(expect_url);
      });
    });

    describe('when name=test are given as parameter', () => {
      it('returns the base url + path + parameters', () => {
        let base_url = this.rest_service.getBaseURLWithVersioning();
        let path = "path";
        let parameters = new Map<String, String>([['name', 'test']]);
        let expect_url = base_url + path + '?name=test&';
        expect(this.rest_service.getFullURLWithVersioning(path, parameters)).toEqual(expect_url);
      });
    });
  });

  describe('::getHeadersForJSON', () => {
    it('returns an instance of RequestOptions', () => {
      expect(this.rest_service.getHeadersForJSON() instanceof RequestOptions).toBeTruthy();
    });

    it('specifies that Content-Type is JSON', () => {
      let response_request = this.rest_service.getHeadersForJSON();
      expect(response_request.headers.get('Content-Type')).toEqual('application/json');
    });
  });
});
