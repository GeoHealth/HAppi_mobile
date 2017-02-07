import {} from 'jasmine';
import {OccurrenceRestService} from '../../../app/services/occurrence_rest_service';
import {Http} from "@angular/http";
import {Occurrence} from "../../../models/occurrence";
import {HttpMock} from "../../mocks";
import {SymptomWithFactor} from "../../../models/symptom_with_factors";
import {Observable} from "rxjs/Rx";

describe('Occurence rest service', () => {

  describe('#add', () => {

    beforeEach(() => {

      this.occurrence_rest_service = new OccurrenceRestService(new HttpMock() as Http);

      spyOn(this.occurrence_rest_service.http, 'post').and.returnValue(
        Observable.of({"status": 201})
      );
    });

    it('returns code 201', (done) => {
      let symptom: SymptomWithFactor = new SymptomWithFactor('name');
      symptom.id = '3';
      let occurrence = new Occurrence(symptom, "2016-12-15", null, null);
      this.occurrence_rest_service.add(occurrence).subscribe((res) => {
        expect(res.status).toEqual(201);
        done();
      });
    });
  });
});
