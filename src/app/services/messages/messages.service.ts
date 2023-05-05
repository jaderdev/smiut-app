import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import Swal, { SweetAlertOptions } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  private config = {
    success: "Realizado com sucesso",
    error: "Tente novamente mais tarde",
    timer: 3000
  }
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  success(toast: boolean = false, message: string = this.config.success) {
    let data: SweetAlertOptions<any> = {
      icon: 'success',
      text: message,
      timer: this.config.timer,
    }

    if (toast) {
      let dataToast = {
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
      }
      Object.assign(data, dataToast);
    }
    Swal.fire(data);
  }
  error(toast: boolean = false, message: string = this.config.error) {
    let data: SweetAlertOptions<any> = {
      icon: 'error',
      title: 'Oops...',
      text: message,
      timer: this.config.timer,
    }

    if (toast) {
      let dataToast = {
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
      }
      Object.assign(data, dataToast);
    }
    Swal.fire(data);
  }

  generic(toast: boolean = false, title: string, message: string, icon: string = "", timer: number = this.config.timer) {
    let data: SweetAlertOptions<any> = {
      text: message,
      title: title,
      timer: timer,
    }

    if (toast) {
      let dataToast = {
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true,
      }
      Object.assign(data, dataToast);
    }
    Swal.fire(data);
  }

  confirm(title: string, text: string, confirmButtonText: string = "Sim", cancelButtonText: string = "Não") {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: cancelButtonText,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText
    })
  }

  loading(html: string = 'Por favor, aguarde', title: string = 'Carregando!',) {
    Swal.close();
    Swal.fire({
      title: title,
      html: html,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  closeLoading() {
    Swal.close();
  }
}
