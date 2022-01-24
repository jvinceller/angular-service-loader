import {Component, Input, OnDestroy} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {TimeService} from "../../services/time.service";

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnDestroy {
  private _doorstopControl$ = new Subject<void>();
  private doorstopEvent$ = this._doorstopControl$.asObservable();

  logs: string[] = [];

  @Input()
  set source(observable: Observable<any>) {
    this.prepareLogging(observable);
  }

  constructor(private readonly timeService: TimeService) {
  }

  private prepareLogging(observable: Observable<any>) {
    observable.pipe(takeUntil(this.doorstopEvent$)).subscribe(nextValue => {
      const logMsg = `value = ${nextValue.toString()}, timestamp = ${this.timeService.toString()}`;
      this.logs.push(logMsg);
    });
  }

  ngOnDestroy() {
    this._doorstopControl$.next();
    this._doorstopControl$.complete();
  }
}
