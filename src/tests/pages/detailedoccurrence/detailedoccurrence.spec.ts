import {DetailedOccurrencePage} from "../../../pages/detailedoccurrence/detailedoccurrence";
import {NavMock, NavParamsMock} from "../../mocks";
import {OccurrenceStorage} from "../../../app/provider/occurrence_storage";

describe('DetailedOccurrencePage', () => {

  beforeEach(() => {
    this.detailed_occurrence = new DetailedOccurrencePage(new NavMock() as any, new NavParamsMock() as any, new OccurrenceStorage(), null);
  });

  describe('#constructor', () => {
    it('creates an Occurrence based on the symptom provided in NavParams', () => {
      expect(this.detailed_occurrence.occurrence).toBeDefined();
    });
  });
});
