import {Injectable} from '@angular/core';
import {forkJoin, Observable, Subject, takeUntil} from "rxjs";
import {S1Service} from "./s1.service";
import {S2Service} from "./s2.service";
import {S3Service} from "./s3.service";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _doorstopControl$ = new Subject<void>();
  private doorstopEvent$ = this._doorstopControl$.asObservable();

  constructor(private readonly s1: S1Service,
              private readonly s2: S2Service,
              private readonly s3: S3Service) {
  }

  stopLoading(): void {
    this._doorstopControl$.next();
    this._doorstopControl$.complete();
  }

  loadBackendData(): Observable<number> {
    // complex logic and loading numberous services even depending from each other
    // at the end you should get a basic set of data you can build up your UI with
    return new Observable<number>(subscriber => {
      // load the first two services parallel
      forkJoin([this.s1.loadOne(), this.s2.loadTwo()]).pipe(takeUntil(this.doorstopEvent$)).subscribe({
        next: ([result1, result2]) => {
          // load the third depending on the result of the first two just to have more fun
          this.s3.loadThree(result1 + result2).pipe(takeUntil(this.doorstopEvent$)).subscribe({
            next: (result3) => {
              // emitting the combined result of all the loading
              subscriber.next(result3);
            }, error: (errorS3) => {
              subscriber.error(errorS3);
            }
          });
        }, error: (errorForkJoin) => {
          subscriber.error(errorForkJoin);
        }
      });
    });
  }
}
