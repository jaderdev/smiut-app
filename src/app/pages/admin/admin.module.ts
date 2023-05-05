import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { MenuAdminModule } from 'src/app/components/menu-admin/menu-admin.module';
import { HeaderAdminModule } from 'src/app/components/header-admin/header-admin.module';
import { SettingsComponent } from './settings/settings.component';
import { SensorsPageModule } from './sensors/sensors.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    MenuAdminModule,
    HeaderAdminModule,
    SensorsPageModule,
  ],
  declarations: [AdminPage, SettingsComponent]
})
export class AdminPageModule { }
