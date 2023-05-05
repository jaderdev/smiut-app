import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderAdminModule } from 'src/app/components/header-admin/header-admin.module';
import { DiarioComponent } from './diario/diario.component';
import { ReportsComponent } from './reports.component';
import { MediaComponent } from './media/media.component';


@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderAdminModule
  ],
  declarations: [DiarioComponent, MediaComponent, ReportsComponent]
})
export class ReportsModule { }
