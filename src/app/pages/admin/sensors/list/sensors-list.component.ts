import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { onValue } from "firebase/database";
import { UsersService } from 'src/app/services/users/users.service';
import { SensorsService } from 'src/app/services/sensors/sensors.service';
import { ModalController } from '@ionic/angular';
import { SensorsItemComponent } from '../item/sensors-item.component';
import { Router } from '@angular/router';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Swiper, SwiperOptions, Zoom } from 'swiper';
import { NativeMessagesService } from 'src/app/services/nativeMessages/nativeMessages.service';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-sensors-list',
  templateUrl: './sensors-list.component.html',
  styleUrls: ['./sensors-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SensorsListComponent implements OnInit, AfterViewInit {
  empresa: string = '';
  title: string = 'Sensores';
  gaugeOptions = this.sensorsService.gaugeOptions;
  isLoading: boolean = true;
  sensors: any = [];

  rangeLimits: any = {};
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: true,
    keyboard: true,
    loop: true,
    pagination: true,
    initialSlide: 1
  };

  constructor(
    private firebaseService: FirebaseService,
    private userService: UsersService,
    private sensorsService: SensorsService,
    private nativeMessagesService: NativeMessagesService,
    private cdf: ChangeDetectorRef,
    public modalController: ModalController,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.nativeMessagesService.loading();
    this.empresa = this.userService.item.id_empresa;
    this.sensors = await this.getInitialData(this.empresa);
    this.getRealtimeSensors(this.empresa);
  }

  ngAfterViewInit(): void {
    setTimeout(function () {
      const mySwiper = new Swiper(".swiper-container", {
        autoplay: {
          delay: 10000,
        },
        speed: 1000,
        slidesPerView: 1,
        spaceBetween: 0,
        keyboard: true,
        pagination: true,
        initialSlide: 0
      });
    }, 4000);
  }
  onSwiper(data: any) {
    console.log('onSwiper', data);
  }

  onSlideChange(data: any) {
    console.log('onSlideChange', data);
  }

  async getInitialData(empresa: string) {
    const response = await this.sensorsService.getItemBySlug(empresa);
    const auxFinal = this.sensorsService.formatSensors(response);
    return auxFinal;
  }

  getRealtimeSensors(link: string) {
    const realtimeData = this.firebaseService.getRef(`${link}/sensores`);
    onValue(realtimeData, (snapshot) => {
      const dataAux = snapshot.val();
      const data = this.firebaseService.mergeRealtimeLocalData(dataAux, 'deviceid');
      const auxSensors = this.sensorsService.formatSensors(data);

      this.sendMessageOutRange(this.sensors.all, auxSensors.all);
      this.sensors = auxSensors;

      this.sensorsService.setItem(auxSensors);
      this.isLoading = false;
      this.nativeMessagesService.closeLoading();
      this.cdf.detectChanges();
    });
  }

  sendMessageOutRange(sensorsOld: any, sensorsNew: any) {
    const sensorsOut = this.sensorsService.verifyOutRangeSendMessage(sensorsOld, sensorsNew);
    if (sensorsOut.length == 0) return;
    sensorsOut.forEach((sensor: any) => {
      this.nativeMessagesService.error(`Sensor ${sensor} está fora do limite`);
    });
  }

  async goToItem(item: any, isModal: boolean = false) {
    if (isModal) {
      const modal = await this.modalController.create({
        component: SensorsItemComponent,
        componentProps: {
          'item': item,
          'empresa': this.empresa,
          'range': this.rangeLimits
        }
      });
      return await modal.present();
    }
    this.router.navigate(['admin', 'sensors', item.deviceid])

  }

}