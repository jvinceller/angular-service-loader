import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {S1Service} from "./services/s1.service";
import {S2Service} from "./services/s2.service";
import {S3Service} from "./services/s3.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [S1Service, S2Service, S3Service],
  bootstrap: [AppComponent]
})
export class AppModule {
}
