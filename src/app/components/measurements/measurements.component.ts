import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TimeService} from "../../services/time.service";

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.css']
})
export class MeasurementsComponent implements OnInit {
  private intervalHandle: number = 0;

  constructor(readonly timeService: TimeService, private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    // recalculate template every 50ms to show new async time-gone-by value
    this.intervalHandle = setInterval(() => this.changeDetectorRef.detectChanges(), 50);

    // listen to event if measuring stopped
    this.timeService.stoppedMeasuringEvent$.subscribe(_ => this.stopChangeDetection())
  }

  private stopChangeDetection() {
    clearInterval(this.intervalHandle);
  }
}
