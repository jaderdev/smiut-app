import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiAxiosService {
  private request = axios.create({
    baseURL: environment.apiURL,
    timeout: 0,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  constructor() {
    this.request.interceptors.request.use((request) => {
      const existToken = this.isTokenSetted();
      if (existToken.isSetted) {
        request.headers["Authorization"] = `Bearer ${existToken.token}`;
      }

      return request;
    }, (error) => {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    });
  }

  async readId(url: String, id: Number) {
    try {
      const response = await this.request.get(`${url}/${id}`);
      return await (response.data.data);
    } catch (error: any) {
      const errorMessage = this.formatErrorMessage(error);
      return errorMessage;
    }
  }

  async read(url: string, params: any = {}) {
    try {
      const response = await this.request.get(url, {
        params: params
      });
      return await (response.data.data);
    } catch (error: any) {
      const errorMessage = this.formatErrorMessage(error);
      return errorMessage;
    }
  }

  async create(url: string, data: any) {
    try {
      const response = await this.request.post(url, data);
      return await (response.data);
    } catch (error: any) {
      const errorMessage = this.formatErrorMessage(error);
      return errorMessage;
    }
  }

  async update(url: string, data: any) {
    try {
      const response = await this.request.patch(url, data);
      return await (response.data);
    } catch (error: any) {
      return this.formatErrorMessage(error);
    }
  }

  async post(url: string, data: any = []) {
    try {
      const response = await this.request.post(url, data);
      return await (response.data);
    } catch (error: any) {
      const errorMessage = this.formatErrorMessage(error);
      return errorMessage;
    }
  }
  async delete(url: string) {
    try {
      const response = await this.request.delete(url);
      return await (response.data);
    } catch (error: any) {
      const errorMessage = this.formatErrorMessage(error);
      return errorMessage;
    }
  }
  async upload(url: string, data: any = []) {
    try {
      const response = await axios.post(`${environment.apiURL}${url}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.token}`
        },
      });
      return await (response.data);
    } catch (error: any) {
      return this.formatErrorMessage(error);
    }
  }

  isTokenSetted() {
    if (sessionStorage.token) {
      return {
        isSetted: true,
        token: sessionStorage.getItem('token'),
      };
    }
    return {
      isSetted: false,
      token: '',
    };
  }

  formatErrorMessage(error: any) {
    if (error?.response?.data?.error) return error?.response?.data;
    if (error.message) return error.message;
    return error.response.data;
  }
}