import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoliticaComponent } from './docs/politica/politica.component';
import { LoginComponent } from './login/login.component';
import { PublicPagesPage } from './public-pages.page';

const routes: Routes = [
  {
    path: '',
    component: PublicPagesPage,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'politica-privacidade',
        component: PoliticaComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPagesPageRoutingModule { }
