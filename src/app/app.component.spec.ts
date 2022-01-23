import {AppComponent} from './app.component';
import {Observable} from "rxjs";

/**
 * What we want to test is the following.
 *
 * 1) S3Service delivers a number defined in this test (z)
 *    output$ should deliver the right number, which is (z).
 * 2) If any service fails, output$ fails.
 */
describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    const s1mock = {
      loadOne: () => new Observable(subscriber => {
        subscriber.next(1);
        subscriber.complete();
      })
    };

    const s2mock = {
      loadTwo: () => new Observable(subscriber => {
        subscriber.next(2);
        subscriber.complete();
      })
    };

    const s3mock = {
      loadThree: () => new Observable(subscriber => {
        subscriber.next(3);
        subscriber.complete();
      })
    };

    const ngZoneMock = {
      runOutsideAngular: jest.fn()
    };

    const cdRefMock = {
      detectChanges: jest.fn()
    };

    const provide = (mock: any): any => mock;

    component = new AppComponent(provide(s1mock), provide(s2mock), provide(s3mock), provide(ngZoneMock), provide(cdRefMock));
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
