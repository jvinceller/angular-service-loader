import {AppComponent} from './app.component';

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
    const timeMock = {
      startMeasuringTimeGoneBy: jest.fn()
    };

    const loaderMock = {
      stopLoading: jest.fn()
    };

    const provide = (mock: any): any => mock;

    component = new AppComponent(provide(timeMock), provide(loaderMock));
  });

  it('ngOnInit() runs flawlessly', () => {
    component.ngOnInit();

    expect(component).toBeTruthy();
  });
});
