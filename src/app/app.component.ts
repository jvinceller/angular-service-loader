import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {S1Service} from "./services/s1.service";
import {S2Service} from "./services/s2.service";
import {S3Service} from "./services/s3.service";
import {BehaviorSubject, forkJoin, Observable, Subject, takeUntil} from "rxjs";
import {LoadingObservableWrapper} from "./loading-observable-wrapper";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private startTimestamp = performance.now();
  private intervalHandle: any;
  private unsubscribe$ = new Subject<void>();

  output$ = new BehaviorSubject<number>(0);
  outputWrapper = new LoadingObservableWrapper(this.output$);
  timeGoneBy = 0;
  logs: string[] = [];

  constructor(private readonly s1: S1Service,
              private readonly s2: S2Service,
              private readonly s3: S3Service,
              private readonly ngZone: NgZone,
              private readonly changeDetectorRef: ChangeDetectorRef) {
    this.prepareLoggingValues(this.output$);
    this.startTimeGoneBy();
  }

  ngOnInit() {
    // load the first two services parallel
    forkJoin([this.s1.loadOne(), this.s2.loadTwo()]).pipe(takeUntil(this.unsubscribe$)).subscribe(([result1, result2]) => {
      // load the third depending on the result of the first two just to have more fun
      this.s3.loadThree(result1 + result2).pipe(takeUntil(this.unsubscribe$)).subscribe(result3 => {
        this.output$.next(result3);
      }, errorS3 => {
        this.output$.error(errorS3);
      });
    }, errorForkJoin => {
      this.output$.error(errorForkJoin);
    });
  }

  stopAsyncCalls() {
    this.stopMeasuringTimeGoneBy();
    this.stopObservables();
  }

  private stopMeasuringTimeGoneBy() {
    clearInterval(this.intervalHandle);
  }

  private stopObservables() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private startTimeGoneBy() {
    this.ngZone.runOutsideAngular(() => {
      this.intervalHandle = setInterval(() => this.calculateTimeGoneBy(), 50);
    });
  }

  private calculateTimeGoneBy() {
    this.timeGoneBy = (performance.now() - this.startTimestamp) / 1000;
    this.changeDetectorRef.detectChanges();
  }

  private prepareLoggingValues(observable: Observable<any>) {
    observable.pipe(takeUntil(this.unsubscribe$)).subscribe(nextValue => {
      const logMsg = `value = ${nextValue.toString()}, timestamp = ${this.timeGoneBy.toFixed(1)}s`;
      this.logs.push(logMsg);
    });
  }
}
