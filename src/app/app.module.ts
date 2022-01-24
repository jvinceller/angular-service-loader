import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {S1Service} from "./services/s1.service";
import {S2Service} from "./services/s2.service";
import {S3Service} from "./services/s3.service";
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { MeasurementsComponent } from './components/measurements/measurements.component';
import { LoggingComponent } from './components/logging/logging.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowcaseComponent,
    MeasurementsComponent,
    LoggingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [S1Service, S2Service, S3Service],
  bootstrap: [AppComponent]
})
export class AppModule {
}
