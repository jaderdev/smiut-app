import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiAxiosService } from '../api-axios/api-axios.service';
import {
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint: string = 'users';
  private prod_sulfix: string = environment.prod_sulfix;
  private _item: any;

  public get item(): any {
    return this._item;
  }
  public set item(value: any) {
    this._item = value;
  }
  constructor(
    private apiAxios: ApiAxiosService,
  ) { }

  createUser(data: any) {
    const response = this.apiAxios.create(`${this.prod_sulfix}/${this.endpoint}`, data);
    return response;
  }

  async updateUser(data: any) {
    const response = await this.apiAxios.update(`${this.endpoint}/update`, data);
    if (response.message == 'success') {
      this.setItem(response.data);
    }
    return response;
  }

  recuperarPasse(data: any) {
    const response = this.apiAxios.create(`${this.prod_sulfix}/${this.endpoint}/recuperar-passe`, data);
    return response;
  }

  setItem(data: any) {
    this.item = data;
    this.setUserDataToLocalStorage(data);
    if (!sessionStorage?.token || sessionStorage?.token == undefined) {
      sessionStorage.token = data.token;
    }
  }

  eraseData() {
    this.item = undefined;
  }

  getUserDataLocalStorage() {
    const aux = localStorage.getItem('cliente');
    if (aux == 'undefined' || aux == undefined) {
      localStorage.clear();
      return;
    }
    try {
      const user = JSON.parse(aux);
      return user;
    } catch (error) {
      return;
    }
  }

  setUserDataToLocalStorage(data: any) {
    localStorage.cliente = JSON.stringify(data);
  }

  getCurrentUser() {
    const token = sessionStorage.getItem('token');
    if (token) {
      const response = this.apiAxios.post(`auth/token`);
      return response;
    }
    return false;
  }

  addInfoUser(data: any) {
    let user = this._item;
    Object.keys(data).forEach((k) => {
      user[k] = data[k];
    });
    this.setUserDataToLocalStorage(user);
  }

  async pushNotificationRegister() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        return false;
      }
    });

    // On success, we should be able to receive notifications
    await PushNotifications.addListener('registration', (token: Token) => {
      if (this.item.push_token == undefined) {
        this.item.push_token = token.value;
        this.addPushTokenToDB(token.value);
      }
      return true;
    }
    );
    return true;
  }

  async addPushTokenToDB(token: string) {
    const response = await this.apiAxios.read(`funcionarios/notifications/${token}`);
    if (response.message == 'success') {
      this.addInfoUser({ push_token: token });
    }
  }

}
