import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss'],
})
export class MenuAdminComponent implements OnInit {
  public appPages = [
    { title: 'Sensores', url: '/admin/sensors/list', icon: 'paper-plane' },
  ];
  public reports = [
    { title: 'Diário', url: '/admin/reports/diario', icon: 'archive' },
    { title: 'Média', url: '/admin/reports/media', icon: 'archive' },
  ];
  public labels = ['Temperatura', 'Umidade'];
  empresa: any;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private userService: UsersService,
  ) { }

  ngOnInit() {
    this.empresa = this.userService.item.empresa;
  }

  async logoutAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Terminar Sessão',
      message:
        'Deseja desconectar da sua conta? Terá de fazer novamente o login',
      buttons: [
        {
          text: 'Sair',
          handler: () => {
            this.logout();
            location.reload();
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
      ],
    });
    await alert.present();
  }

  async logout() {
    const response = this.authService.logout();
    this.router.navigate(['/']);
  }

}
