import {DetailedOccurrencePage} from "../../../pages/detailedoccurrence/detailedoccurrence";
import {NavMock, NavParamsMock} from "../../mocks";
import {OccurrenceStorage} from "../../../app/provider/occurrence_storage";

describe('DetailedOccurrencePage', () => {
  let detailed_occurrence: DetailedOccurrencePage;

  beforeEach(() => {
    detailed_occurrence = new DetailedOccurrencePage(new NavMock() as any, new NavParamsMock() as any, new OccurrenceStorage(), null);
  });

  describe('#constructor', () => {

  });
});
