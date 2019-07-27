import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// components
import { FeedbackComponent, ReportComponent } from './components';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, FeedbackComponent, ReportComponent],
  imports: [BrowserModule, AppRoutingModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
