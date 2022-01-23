import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class S2Service {
  loadTwo(): Observable<number> {
    return new Observable<number>(subscriber => {
      setTimeout(() => {
        subscriber.next(22);
        subscriber.complete();
      }, 2000);
    });
  }
}
