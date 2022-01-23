import {catchError, shareReplay} from 'rxjs/operators';
import {EMPTY, Observable, Subject} from "rxjs";

export class LoadingObservableWrapper<T> {
  private readonly _errorLoading$ = new Subject<boolean>();
  readonly errorLoading$: Observable<boolean> = this._errorLoading$.pipe(
    shareReplay(1)
  );
  readonly data$: Observable<T>;

  constructor(data: Observable<T>) {
    this.data$ = data.pipe(
      shareReplay(1),
      catchError(error => {
        console.log(error);
        this._errorLoading$.next(true);
        return EMPTY;
      })
    );
  }

}