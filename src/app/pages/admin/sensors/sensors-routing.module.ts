import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorsItemComponent } from './item/sensors-item.component';
import { SensorsListComponent } from './list/sensors-list.component';

import { SensorsPage } from './sensors.page';
import { StepHoursComponent } from './step-hours/step-hours.component';

const routes: Routes = [
  {
    path: '',
    component: SensorsPage,
    children: [
      {
        path: 'list',
        component: SensorsListComponent,
      },
      {
        path: ':deviceid',
        component: SensorsItemComponent,
      },
      {
        path: ':deviceid/step',
        component: StepHoursComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SensorsPageRoutingModule {}
