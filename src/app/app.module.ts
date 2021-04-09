import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MainServiceService} from "./service/main-service.service";

import {ChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [
      MainServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
