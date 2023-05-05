import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAxiosService } from '../api-axios/api-axios.service';
import { SensorsService } from '../sensors/sensors.service';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint: string = 'auth';
  constructor(
    private apiAxios: ApiAxiosService,
    private userService: UsersService,
    private sensorsService: SensorsService,
    private router: Router
  ) { }

  logout() {
    this.sensorsService.eraseData();
    this.userService.eraseData();
    localStorage.clear();
    sessionStorage.clear();
  }

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password,
      isApp: true,
    };
    const response = this.apiAxios.post(`${this.endpoint}/login`, data);
    return response;
  }

  setUser(data: any) {
    this.userService.setItem(data);
  }

  async verifyToken() {
    if (sessionStorage.getItem('token')) {
      const response = await this.apiAxios.post(`${this.endpoint}/token`, []);
      if (response?.data?.length == 0 || response?.data?.ativo != 1) return false;
      return response;
    }
    return false;
  }

  isLogged(redirectToLogin: boolean = false) {
    if (!this.userService?.item?.token) {
      sessionStorage.lastPage = location.pathname;
      if (redirectToLogin) {
        this.router.navigate(['login']);
      }
      return;
    }
    return true;
  }

  getUserByToken(data: any) {
    if (sessionStorage.getItem('token')) {
      const response = this.apiAxios.post(`${this.endpoint}/verifyToken`, data);
      return response;
    }
    return;
  }

}