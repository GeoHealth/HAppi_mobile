import { HAppiApp }                      from '../../app/app.component';
import { NavMock, PlatformMock } from '../mocks';
// import { Page2 }                           from '../pages';

let instance: HAppiApp = null;

describe('HAppiApp', () => {

  beforeEach(() => {
    instance = new HAppiApp((<any> new PlatformMock));
    instance['nav'] = (<any>new NavMock());
  });

  // it('initialises with two possible pages', () => {
  //   expect(instance['pages'].length).toEqual(2);
  // });
  //
  // it('initialises with a root page', () => {
  //   expect(instance['rootPage']).not.toBe(null);
  // });
  //
  // it('initialises with an app', () => {
  //   expect(instance['app']).not.toBe(null);
  // });

  // it('opens a page', () => {
  //   spyOn(instance['menu'], 'close');
  //   spyOn(instance['nav'], 'setRoot');
  //   instance.openPage(instance['pages'][1]);
  //   expect(instance['menu']['close']).toHaveBeenCalled();
  //   expect(instance['nav'].setRoot).toHaveBeenCalledWith(Page2);
  // });
});
