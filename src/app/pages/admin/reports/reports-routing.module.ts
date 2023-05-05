import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiarioComponent } from './diario/diario.component';
import { MediaComponent } from './media/media.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'diario',
        component: DiarioComponent,
      },
      {
        path: 'media',
        component: MediaComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
