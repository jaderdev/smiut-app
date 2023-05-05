import { Injectable } from '@angular/core';
import { ApiAxiosService } from '../api-axios/api-axios.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    private apiAxios: ApiAxiosService,
  ) { }

  splitArray(data: any, size: number) {
    var newArray = [];
    var i = 0;
    while (i < data.length) {
      newArray.push(data.slice(i, i + size));
      i += size;
    }
    return newArray;
  }

  async todayDate() {
    const response = await this.apiAxios.read(`public/date`);
    const aux = response[0].date.slice(0, 10);
    return aux;
  }

  getLastParamsUrl(location: Location) {
    const aux = location.pathname.split('/');
    return aux[aux.length - 1];
  }

  formatToBrDate(data: string) {
    const aux = new Date(data);
    return (aux.toLocaleDateString('pt-BR')).split('/').join('-');
  }

  beautifyURL(title: string) {
    return title
      .replace(/\s/g, "-")
      .replace(/-+/g, "-")
      .replace(/[^a-å0-9-]/gi, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

}
