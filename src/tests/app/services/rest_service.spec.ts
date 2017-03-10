import {RestService} from "../../../app/services/rest_service";
import {RequestOptions} from "@angular/http";

describe('RestService', () => {
  beforeEach(() => {
    this.rest_service = new RestService(null);
  });

  describe('#getBaseURL', () => {
    it('returns "protocol" + domain + ":" + port + "/"', () => {
      let expect_url = this.rest_service.protocol + this.rest_service.apiDomainName + ":" + this.rest_service.apiPort + "/";
      expect(this.rest_service.getBaseURL()).toEqual(expect_url);
    });
  });

  describe('#getFullURL', () => {
    it('returns the base url + path', () => {
      let base_url = this.rest_service.getBaseURL();
      let path = "path";
      let expect_url = base_url + path;
      expect(this.rest_service.getFullURL(path)).toEqual(expect_url);
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
