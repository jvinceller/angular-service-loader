import {catchError, tap} from 'rxjs/operators';
import {EMPTY, Observable, Subject} from "rxjs";

export class LoadingObservableWrapper<T> {
  // // delivers true at some point in time if data is loaded
  // private readonly _errorLoading$ = new Subject<boolean>();
  // // lets you subscribe later and still get the emit from the original source
  // readonly errorLoading$: Observable<boolean> = this._errorLoading$.pipe(
  //   shareReplay(1)
  // );
  // // delivers data at some point in time if data is loaded
  // private readonly _data$: Observable<T> = new Subject<T>();
  // // lets you subscribe later and still get the emit from the original source
  // readonly data$: Observable<T> = this._data$.pipe(
  //   shareReplay(1)
  // );
  readonly errorLoading$ = new Subject<boolean>();
  readonly data$ = new Subject<T>();

  constructor() {
  }

  load(data: Observable<T>) {
    data.pipe(
      tap((response: T) => this.data$.next(response)),
      catchError(error => {
        console.log(error);
        this.errorLoading$.next(true);
        return EMPTY;
      })
    );
  }

}
