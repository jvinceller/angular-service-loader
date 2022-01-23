import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  loadThree(request: number): Observable<number> {
    return new Observable<number>(subscriber => {
      setTimeout(() => {
        subscriber.next(request * 3);
        subscriber.complete();
      }, 1000);
    });
  }
}
