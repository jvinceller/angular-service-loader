import {Observable} from "rxjs";
import {LoaderService} from "./loader.service";

/**
 * What we want to test is the following.
 *
 * 1) S3Service delivers a number defined in this test (z)
 *    output$ should deliver the right number, which is (z).
 * 2) If any service fails, output$ fails.
 */
describe('LoaderService', () => {
  let service: LoaderService;

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

    const provide = (mock: any): any => mock;

    service = new LoaderService(provide(s1mock), provide(s2mock), provide(s3mock));
  });

  it('should create the app', () => {
    expect(service).toBeTruthy();
  });

  it('loadBackendData() loads all services successfully', (done) => {
    let isObservableCompleted = false;
    service.loadBackendData().subscribe({
      next: value => {
        expect(value).toBe(3);
      }, error: err => {
        done(err);
      }, complete: () => {
        isObservableCompleted = true;
      }
    });

    if (!isObservableCompleted) {
      done('Observable did not complete');
    } else {
      done();
    }
  });
});
