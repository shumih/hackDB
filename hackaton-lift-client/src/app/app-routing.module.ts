import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import {FeedbackComponent, ReportComponent} from './components';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: 'feedback',
    component: FeedbackComponent,
    loadChildren: './modules/feedback/feedback.module#FeedbackModule'
  },
  {
    path: 'report',
    component: ReportComponent,
    loadChildren: './modules/report/report.module#ReportModule',
  },
  {
    path: 'main',
    component: MainComponent,
    loadChildren: './modules/main/main.module#MainModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
