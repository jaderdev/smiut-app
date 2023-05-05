import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAdminComponent } from './menu-admin.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MenuAdminComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [MenuAdminComponent]
})
export class MenuAdminModule { }
