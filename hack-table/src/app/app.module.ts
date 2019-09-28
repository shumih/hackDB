import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { DetailsComponent } from './components/details/details.component';
import {MatButtonModule, MatListModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'hackaton-lift-client'),
    MatListModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
