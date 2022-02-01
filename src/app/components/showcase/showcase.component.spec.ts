import {ShowcaseComponent} from './showcase.component';
import {Observable} from "rxjs";

/**
 * What we want to test is the following.
 *
 * 1) S3Service delivers a number defined in this test (z)
 *    output$ should deliver the right number, which is (z).
 * 2) If any service fails, output$ fails.
 */
describe('ShowcaseComponent', () => {
  let component: ShowcaseComponent;

  beforeEach(async () => {
    const loaderMock = {
      loadOne: () => new Observable(subscriber => {
        subscriber.next(1);
        subscriber.complete();
      })
    };

    const provide = (mock: any): any => mock;

    component = new ShowcaseComponent(provide(loaderMock));
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // TODO test with mocked processing
});
