import {} from "jasmine";
import { OccurrenceRestService } from "../../../app/services/occurrence_rest_service";
import { Http } from "@angular/http";
import { Occurrence } from "../../../models/occurrence";
import { HttpMock, OccurrenceStorageMock } from "../../mocks";
import { SymptomWithFactor } from "../../../models/symptom_with_factors";
import { Observable } from "rxjs/Rx";
import { OccurrenceStorage } from "../../../app/provider/occurrence_storage";

describe('Occurence rest service', () => {
  describe('#add', () => {
    beforeEach(() => {
      this.occurrence_rest_service = new OccurrenceRestService(new HttpMock() as Http, new OccurrenceStorageMock() as OccurrenceStorage);

      spyOn(this.occurrence_rest_service.http, 'post').and.returnValue(
        Observable.of({"status": 201})
      );
    });

    it('returns code 201', (done) => {
      this.symptom = new SymptomWithFactor('name');
      this.symptom.id = '3';
      this.occurrence = new Occurrence(this.symptom, "2016-12-15", null, null);
      this.occurrence_rest_service.add(this.occurrence).subscribe((res) => {
        expect(res.status).toEqual(201);
        done();
      });
    });
  });
});
