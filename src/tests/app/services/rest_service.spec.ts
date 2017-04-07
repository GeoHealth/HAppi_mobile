import { RestService } from "../../../app/services/rest_service";
import { RequestOptions } from "@angular/http";
import { CrashlyticsMock } from "../../mocks";

describe('RestService', () => {
  beforeEach(() => {
    this.rest_service = new RestService(null, new CrashlyticsMock());
  });

  afterEach(() => {
    this.rest_service = null;
  });

  describe('#getBaseURL', () => {
    it('returns "protocol" + domain + ":" + port + "/"', () => {
      this.expect_url = this.rest_service.protocol + this.rest_service.apiDomainName + ":" + this.rest_service.apiPort + '/';
      expect(this.rest_service.getBaseURL()).toEqual(this.expect_url);

      this.expect_url = null;
    });
  });

  describe('#getFullURL', () => {
    describe('when no parameters are given', () => {
      it('returns the base url + path', () => {
        this.base_url = this.rest_service.getBaseURL();
        this.path = "path";
        this.expect_url = this.base_url + this.path;
        expect(this.rest_service.getFullURL(this.path)).toEqual(this.expect_url);

        this.base_url = null;
        this.path = null;
        this.expect_url = null;
      });
    });

    describe('when name=test are given as parameter', () => {
      it('returns the base url + path + parameters', () => {
        this.base_url = this.rest_service.getBaseURL();
        this.path = "path";
        this.parameters = new Map<String, String>([['name', 'test']]);
        this.expect_url = this.base_url + this.path + '?name=test&';
        expect(this.rest_service.getFullURL(this.path, this.parameters)).toEqual(this.expect_url);

        this.base_url = null;
        this.path = null;
        this.parameters = null;
        this.expect_url = null;
      });
    });
  });

  describe('#getBaseURLWithVersioning', () => {
    it('returns "protocol" + domain + ":" + port + "/" + version + "/"', () => {
      this.expect_url = this.rest_service.protocol + this.rest_service.apiDomainName + ":" + this.rest_service.apiPort + "/" + this.rest_service.apiVersion + '/';
      expect(this.rest_service.getBaseURLWithVersioning()).toEqual(this.expect_url);

      this.expect_url = null;
    });
  });

  describe('#getFullURLWithVersioning', () => {
    describe('when no parameters are given', () => {
      it('returns the base url + path', () => {
        this.base_url = this.rest_service.getBaseURLWithVersioning();
        this.path = "path";
        this.expect_url = this.base_url + this.path;
        expect(this.rest_service.getFullURLWithVersioning(this.path)).toEqual(this.expect_url);

        this.base_url = null;
        this.path = null;
        this.expect_url = null;
      });
    });

    describe('when name=test are given as parameter', () => {
      it('returns the base url + path + parameters', () => {
        this.base_url = this.rest_service.getBaseURLWithVersioning();
        this.path = "path";
        this.parameters = new Map<String, String>([['name', 'test']]);
        this.expect_url = this.base_url + this.path + '?name=test&';
        expect(this.rest_service.getFullURLWithVersioning(this.path, this.parameters)).toEqual(this.expect_url);

        this.base_url = null;
        this.path = null;
        this.parameters = null;
        this.expect_url = null;
      });
    });
  });

  describe('::getHeadersForJSON', () => {
    it('returns an instance of RequestOptions', () => {
      expect(this.rest_service.getHeadersForJSON() instanceof RequestOptions).toBeTruthy();
    });

    it('specifies that Content-Type is JSON', () => {
      this.response_request = this.rest_service.getHeadersForJSON();
      expect(this.response_request.headers.get('Content-Type')).toEqual('application/json');

      this.response_request = null;
    });
  });
});
