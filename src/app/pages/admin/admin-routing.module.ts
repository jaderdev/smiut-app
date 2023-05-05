import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [{
      path: 'sensors',
      loadChildren: () => import('./sensors/sensors.module').then(m => m.SensorsPageModule)
    },
    {
      path: 'settings',
      component: SettingsComponent
    },
    {
      path: 'reports',
      loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
    },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule { }
