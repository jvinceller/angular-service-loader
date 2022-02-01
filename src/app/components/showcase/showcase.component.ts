import {Component, OnInit} from '@angular/core';
import {EMPTY, finalize, map, Subject} from "rxjs";
import {LoaderService} from "../../services/loader.service";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {
  _dataSubject$ = new Subject<number>();
  data$ = this._dataSubject$.asObservable();
  errorLoading$ = new Subject<any>();
  dataProcessor: (backendData: number) => number;

  constructor(private readonly loader: LoaderService) {
    this.dataProcessor = this.processingData;
  }

  ngOnInit() {
    // starts loading data
    this.loader.loadBackendData().pipe(
      // process / convert data after arriving without an error
      map(backendData => this.dataProcessor(backendData)),
      // catching error if any
      catchError((err: any) => {
        this.errorLoading$.next(err);
        return EMPTY;
      }),
      finalize(() => this.onStartUI()),
    ).subscribe(this._dataSubject$);
  }

  private processingData(backendData: number): number {
    return backendData * this.anotherImportantStep();
  }

  private anotherImportantStep(): number {
    return 2;
  }

  private onStartUI(): void {
    // here we may do everything with the loaded data and all the input parameters
  }
}
