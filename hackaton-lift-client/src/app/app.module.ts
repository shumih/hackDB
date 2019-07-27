import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// imports
import { MatButtonModule } from '@angular/material/button';

// components
import { FeedbackComponent, ReportComponent } from './components';

@NgModule({
  declarations: [AppComponent, FeedbackComponent, ReportComponent],
  imports: [BrowserModule, AppRoutingModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
