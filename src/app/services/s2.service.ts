import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class S2Service {
  loadTwo(): Observable<number> {
    return new Observable<number>(subscriber => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          subscriber.error('2nd failed');
        } else {
          subscriber.next(22);
          subscriber.complete();
        }
      }, 2000);
    });
  }
}
