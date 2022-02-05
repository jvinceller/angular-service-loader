import {Injectable} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {S1Service} from "./s1.service";
import {S2Service} from "./s2.service";
import {S3Service} from "./s3.service";
import {StructureLoader} from "./structure-loader";
import {StructureLevel} from "./structure-level";

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
    // defining a structure of services and their loading strategy (parallel / serial)
    const structure = {
      observables: {
        service1: () => this.s1.loadOne().pipe(takeUntil(this.doorstopEvent$)),
        service2: () => this.s2.loadTwo().pipe(takeUntil(this.doorstopEvent$))
      },
      afterAll: {
        observables: {
          service3: (parent: { service1: number, service2: number }) =>
            this.s3.loadThree(parent.service1 + parent.service2).pipe(takeUntil(this.doorstopEvent$))
        }
      }
    } as StructureLevel;

    // complex logic and loading numberous services even depending from each other
    // at the end you should get a basic set of data you can build up your UI with
    return new Observable<number>(subscriber => StructureLoader.loadStructure(structure, subscriber));
  }

}
