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
  beforeAll(() => {
    this.auth_service = new AuthService(
      new AuthRestServiceMock() as AuthRestService,
      new AuthStorageMock() as AuthStorage,
      new CrashlyticsMock() as Crashlytics,
      new SymptomsStorageMock() as SymptomsStorage,
      new OccurrenceStorageMock() as OccurrenceStorage);
  });

  afterAll(() => {
    this.auth_service = null;
  });

  describe('extractAndSaveHeaders', () => {
    beforeEach(() => {
      spyOn(this.auth_service["auth_storage"], "saveHeaders").and.returnValue(Observable.of({}));
    });

    it('extracts the uid, access-token, client, expiry and token-type headers and calls auth_storage.saveHeaders with a filtered version of headers', () => {
      this.full_headers = new Headers({
        "access-token": ["z4YXfBHudEnnk3wJhUPuuw"],
        "expiry": ["1526493314"],
        "uid": ["tanguy.vaessen@gmail.com"],
        "token-type": ["Bearer"],
        "client": ["pAd76ztc7GC-OeubpayDiQ"],
        "Content-Type": ["application/json; charset=utf-8"],
        "Cache-Control": ["max-age=0", " private", " must-revalidate"]
      });
      this.expected_headers = new Headers({
        "access-token": ["z4YXfBHudEnnk3wJhUPuuw"],
        "expiry": ["1526493314"],
        "uid": ["tanguy.vaessen@gmail.com"],
        "token-type": ["Bearer"],
        "client": ["pAd76ztc7GC-OeubpayDiQ"]
      });
      this.response = {headers: this.full_headers};
      this.auth_service.extractAndSaveHeaders(this.response as any);

      let received_headers = this.auth_service["auth_storage"].saveHeaders.calls.mostRecent().args[0];
      console.warn(received_headers);
      expect(received_headers.keys().length).toEqual(5);
      for(let i = 0; i < this.expected_headers.keys().length; i++){
        expect(received_headers.has(this.expected_headers.keys()[i])).toBeTruthy();
      }
    });
  });
});
