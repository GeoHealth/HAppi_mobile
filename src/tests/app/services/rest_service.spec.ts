import {RestService} from "../../../app/services/rest_service";
import {RequestOptions} from "@angular/http";

describe('RestService', () => {
  let rest_service: any;

  beforeEach(() => {
    rest_service = new RestService(null);
  });

  describe('#getBaseURL', () => {
    it('returns "http://" + domain + ":" + port + "/"', () => {
      let expect_url = "http://" + rest_service.apiDomainName + ":" + rest_service.apiPort + "/";
      expect(rest_service.getBaseURL()).toEqual(expect_url);
    });
  });

  describe('#getFullURL', () => {
    it('returns the base url + path', () => {
      let base_url = rest_service.getBaseURL();
      let path = "path";
      let expect_url = base_url + path;
      expect(rest_service.getFullURL(path)).toEqual(expect_url);
    });
  });

  describe('::generateJSONHeadersOptions', () => {
    it('returns an instance of RequestOptions', () => {
      expect(RestService.generateJSONHeadersOptions() instanceof RequestOptions).toBeTruthy();
    });

    it('specifies that Content-Type is JSON', () => {
      let request_options = RestService.generateJSONHeadersOptions();
      expect(request_options.headers.get('Content-Type')).toEqual('application/json');
    });
  });
});
