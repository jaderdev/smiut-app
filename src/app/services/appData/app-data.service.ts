import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SensorsService } from '../sensors/sensors.service';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root',
})

export class AppDataService {
  constructor(
    private userService: UsersService,
    private sensorsService: SensorsService,
    private authService: AuthService,
    public router: Router
  ) { }

  init() {
    return Promise.all([this.getUser()]);
  }

  async getUser() {
    let auxUser = this.userService.getUserDataLocalStorage();
    if (!auxUser) {
      const response = await this.userService.getCurrentUser();
      if (!response) {
        this.authService.logout();
        return;
      }
      auxUser = response.data;
    }
    this.userService.setItem(auxUser);
    return auxUser;
  }
}
