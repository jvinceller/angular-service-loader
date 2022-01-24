import {Component, OnInit} from '@angular/core';
import {TimeService} from "./services/time.service";
import {LoaderService} from "./services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private readonly timeService: TimeService,
              private readonly loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.timeService.startMeasuringTimeGoneBy();
  }

  stopAsyncCalls() {
    this.loaderService.stopLoading();
    this.timeService.stopMeasuringTimeGoneBy();
  }
}
