import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import {FeedbackComponent, ReportComponent} from './components';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
