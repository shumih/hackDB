import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { MainComponent } from './components/main/main.component';
import { StartComponent } from '@core/components/start/start.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'start',
    component: StartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
