import {DetailedOccurrencePage} from "../../../pages/detailedoccurrence/detailedoccurrence";
import {NavMock, NavParamsMock, CrashlyticsMock} from "../../mocks";
import {OccurrenceStorage} from "../../../app/provider/occurrence_storage";
import {OccurrenceRestService} from "../../../app/services/occurrence_rest_service";

describe('DetailedOccurrencePage', () => {

  beforeEach(() => {
    this.detailed_occurrence = new DetailedOccurrencePage(new NavMock() as any, new NavParamsMock() as any, new OccurrenceStorage(new CrashlyticsMock() as any), null, new OccurrenceRestService(null), new CrashlyticsMock() as any);
  });

  describe('#constructor', () => {
    it('creates an Occurrence based on the symptom provided in NavParams', () => {
      expect(this.detailed_occurrence.occurrence).toBeDefined();
    });
  });
});
