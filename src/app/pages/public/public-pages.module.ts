import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicPagesPageRoutingModule } from './public-pages-routing.module';

import { PublicPagesPage } from './public-pages.page';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicPagesPageRoutingModule
  ],
  declarations: [PublicPagesPage,LoginComponent]
})
export class PublicPagesPageModule {}
