import { AuthService } from "../../../app/provider/auth_service";
import { AuthRestService } from "../../../app/services/auth_rest_service";
import {
  AuthRestServiceMock, AuthStorageMock, CrashlyticsMock, OccurrenceStorageMock,
  SymptomsStorageMock
} from "../../mocks";
import { AuthStorage } from "../../../app/provider/auth_storage";
import { Crashlytics } from "../../../app/services/crashlytics";
import { SymptomsStorage } from "../../../app/provider/symptoms_storage";
import { OccurrenceStorage } from "../../../app/provider/occurrence_storage";
import { Observable } from "rxjs/Observable";
import { Headers } from "@angular/http";

describe('AuthService', () => {
  let auth_service: AuthService;
  beforeAll(() => {
    auth_service = new AuthService(
      new AuthRestServiceMock() as AuthRestService,
      new AuthStorageMock() as AuthStorage,
      new CrashlyticsMock() as Crashlytics,
      new SymptomsStorageMock() as SymptomsStorage,
      new OccurrenceStorageMock() as OccurrenceStorage);
  });

  afterAll(() => {
    auth_service = null;
  });

  describe('extractAndSaveHeaders', () => {
    beforeEach(() => {
      spyOn(auth_service["auth_storage"], "saveHeaders").and.returnValue(Observable.of({}));
    });

    it('extracts the uid, access-token, client, expiry and token-type headers and calls auth_storage.saveHeaders with a filtered version of headers', () => {
      let full_headers = new Headers({
        "access-token": ["z4YXfBHudEnnk3wJhUPuuw"],
        "expiry": ["1526493314"],
        "uid": ["tanguy.vaessen@gmail.com"],
        "token-type": ["Bearer"],
        "client": ["pAd76ztc7GC-OeubpayDiQ"],
        "Content-Type": ["application/json; charset=utf-8"],
        "Cache-Control": ["max-age=0", " private", " must-revalidate"]
      });
      let expected_headers =  new Headers({
        "access-token": ["z4YXfBHudEnnk3wJhUPuuw"],
        "expiry": ["1526493314"],
        "uid": ["tanguy.vaessen@gmail.com"],
        "token-type": ["Bearer"],
        "client": ["pAd76ztc7GC-OeubpayDiQ"]
      });
      let response = {headers: full_headers};
      auth_service.extractAndSaveHeaders(response as any);
      expect(auth_service["auth_storage"].saveHeaders).toHaveBeenCalledWith(expected_headers);
    });
  });
});
