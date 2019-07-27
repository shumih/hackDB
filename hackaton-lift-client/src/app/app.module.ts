import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// imports
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

// components
import { FeedbackComponent, ReportComponent } from './components';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { MapsComponent } from './components/maps/maps.component';
import { MapsLoaderService } from './services/maps/maps-loader.service';
import { MapsSearchService } from './services/maps/maps-search.service';
import { CheckAddressComponent } from './components/check-address/check-address.component';
import { ChangeAddressComponent } from './components/change-address/change-address.component';
import { ChangePadickComponent } from './components/change-padick/change-padick.component';
import { ProblemComponent } from './components/problem/problem.component';
import { SurveyComponent } from './components/survey/survey.component';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { StartComponent } from './components/start/start.component';
import { SurveyAskComponent } from './components/survey-ask/survey-ask.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    ReportComponent,
    LoginComponent,
    MainComponent,
    MapsComponent,
    CheckAddressComponent,
    ChangeAddressComponent,
    ChangePadickComponent,
    ProblemComponent,
    SurveyComponent,
    StartComponent,
    SurveyAskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MapsLoaderService, MapsSearchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
