import {Injectable, NgZone} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private startTimestamp = performance.now();
  private intervalHandle: any;
  private timeGoneBy = 0;

  _stoppedMeasuringControl$ = new Subject<void>();
  stoppedMeasuringEvent$ = this._stoppedMeasuringControl$.asObservable();

  constructor(
    private readonly ngZone: NgZone) {
  }

  stopMeasuringTimeGoneBy() {
    clearInterval(this.intervalHandle);
  }

  startMeasuringTimeGoneBy() {
    // measure time gone by asynchronously outside of Angular's zone, no change detection needed here

    // calculate time-gone-by value every 50ms asynchronously
    this.ngZone.runOutsideAngular(() => {
      this.intervalHandle = setInterval(() => this.calculateTimeGoneBy(), 50);
    });
  }

  private calculateTimeGoneBy() {
    this.timeGoneBy = (performance.now() - this.startTimestamp) / 1000;
  }

  toString() {
    return `${this.timeGoneBy.toFixed(1)}s`;
  }
}
