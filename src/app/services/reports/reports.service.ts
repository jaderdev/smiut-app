import { Injectable } from '@angular/core';
import { ApiAxiosService } from '../api-axios/api-axios.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private endpoint: string = "reports";

  constructor(
    private apiAxios: ApiAxiosService,
  ) { }
  getLogs(values: any) {
    const response = this.apiAxios.read(`${this.endpoint}/logs`, values);
    return response;
  }

  getIntervaloTempo(values: any) {
    const response = this.apiAxios.read(`${this.endpoint}/intervalo`, values);
    return response;
  }

  getIntervaloTempoByStep(values: any) {
    const response = this.apiAxios.read(`${this.endpoint}/byTime`, values);
    return response;
  }

  getMedia(values: any) {
    const response = this.apiAxios.read(`${this.endpoint}/media`, values);
    return response;
  }
}
