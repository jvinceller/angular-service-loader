import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class S1Service {
  loadOne(): Observable<number> {
    return new Observable<number>(subscriber => {
      setTimeout(() => {
        subscriber.next(11);
        subscriber.complete();
      }, 1000);
    });
  }
}
