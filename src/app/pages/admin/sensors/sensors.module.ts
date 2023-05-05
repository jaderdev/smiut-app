import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxGaugeModule } from 'ngx-gauge';

import { SensorsPageRoutingModule } from './sensors-routing.module';

import { SensorsPage } from './sensors.page';
import { SensorsListComponent } from './list/sensors-list.component';
import { SensorsItemComponent } from './item/sensors-item.component';
import { HeaderAdminModule } from 'src/app/components/header-admin/header-admin.module';
import { SwiperModule } from 'swiper/angular';
import { StepHoursComponent } from './step-hours/step-hours.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SensorsPageRoutingModule,
    NgxGaugeModule,
    HeaderAdminModule,
    SwiperModule
  ],
  declarations: [SensorsPage, SensorsListComponent, SensorsItemComponent,StepHoursComponent]
})
export class SensorsPageModule { }
