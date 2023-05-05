import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import Swal, { SweetAlertOptions } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})

export class NativeMessagesService {

  private config = {
    success: "Realizado com sucesso",
    error: "Tente novamente mais tarde",
    timer: 3000
  }
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  async success(message: string = this.config.success, showButtons: boolean = false) {
    let config = {
      message: message,
      duration: this.config.timer,
      color: 'success',
      buttons: []
    }
    if (showButtons) {
      config.buttons = [
        {
          text: 'Fechar',
          role: 'cancel',
        }
      ];
    }
    const toast = await this.toastController.create(config);
    await toast.present();
  }

  async error(message: string = this.config.error, showButtons: boolean = false) {
    let config = {
      message: message,
      duration: this.config.timer,
      cssClass: 'custom-toast',
      color: 'danger',
      buttons: []
    }
    if (showButtons) {
      config.buttons = [
        {
          text: 'Fechar',
          role: 'cancel',
        }
      ];
    }
    const toast = await this.toastController.create(config);
    await toast.present();
  }

  async generic(message: string = this.config.success, type: string = '', showButtons: boolean = false) {
    let config = {
      message: message,
      duration: this.config.timer,
      cssClass: 'custom-toast',
      color: type,
      buttons: []
    }
    if (showButtons) {
      config.buttons = [
        {
          text: 'Fechar',
          role: 'cancel',
        }
      ];
    }
    const toast = await this.toastController.create(config);

    await toast.present();
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

  async loading(message: string = 'Loading') {
    const loading = await this.loadingController.create({
      message: message,
      duration: this.config.timer,
    });

    loading.present();
  }

  closeLoading() {
    this.loadingController.dismiss();

  }
}
