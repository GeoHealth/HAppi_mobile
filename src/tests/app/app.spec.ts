import { HAppiApp } from "../../app/app.component";
import { NavMock, PlatformMock } from "../mocks";

describe('HAppiApp', () => {

  beforeEach(() => {
    this.instance = new HAppiApp((new PlatformMock() as any));
    this.instance['nav'] = (new NavMock() as any);
  });
});
