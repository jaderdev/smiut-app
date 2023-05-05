import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { onValue } from 'firebase/database';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { SensorsService } from 'src/app/services/sensors/sensors.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Chart, registerables } from 'chart.js';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { NativeMessagesService } from 'src/app/services/nativeMessages/nativeMessages.service';

@Component({
  selector: 'app-sensors-item',
  templateUrl: './sensors-item.component.html',
  styleUrls: ['./sensors-item.component.scss'],
})

export class SensorsItemComponent implements OnInit {
  deviceid: string = '';
  @Input() item: any;
  @Input() empresa: any;
  @Input() range: any;

  @ViewChild('lineTempCanvas') lineTempCanvas: ElementRef;
  @ViewChild('lineUmidCanvas') lineUmidCanvas: ElementRef;
  lineTemp: any;
  lineUmid: any;

  private dataQty: number = 5;

  constructor(
    public modalController: ModalController,
    private sensorsService: SensorsService,
    private firebaseService: FirebaseService,
    private functionsService: FunctionsService,
    private userService: UsersService,
    private cdf: ChangeDetectorRef,
    private reportsService: ReportsService,
    private nativeMessagesService: NativeMessagesService
  ) {
    Chart.register(...registerables);
  }

  gaugeOptions = this.sensorsService.gaugeOptions;
  sensorsPastData: any;
  sensorsMinMax: any;
  sensorsTitle: any;
  qty: number = 1;
  rangeLimits: any;
  isModal: boolean = true;
  loading: boolean = true;
  showChart: boolean = true;
  dateNow: any;
  teste: any = {};

  async ngOnInit() {
    this.dateNow = await this.functionsService.todayDate();

    await this.nativeMessagesService.loading();
    this.deviceid = this.item?.deviceid;
    this.empresa = this.userService.item.id_empresa;
    if (!this.deviceid) {
      this.deviceid = this.functionsService.getLastParamsUrl(location);
      this.isModal = false;
    } else {
      this.sensorsTitle = this.item.nome;
    }
    const link = `${this.empresa}/sensores/${this.deviceid}`;

    this.getRealtimeSensors(link);
  }

  ionViewWillEnter() {
    const timerId = setInterval(
      () => {
        if (this.lineTempCanvas) {
          this.initChart();
          clearTimeout(timerId);
        }
      }, 100
    );
  }

  async refreshChartsData(data: any) {
    setTimeout(async () => {
      if (this.lineTemp) {
        this.removeDataFromChart(this.lineTemp);
        this.addDataToChart(this.lineTemp, data.labels, data.temp);
      }
      if (this.lineUmid) {
        this.removeDataFromChart(this.lineUmid);
        this.addDataToChart(this.lineUmid, data.labels, data.umid);
      }
    }, 100);
  }

  async addDataToChart(chart: any, label: any, data: any) {
    chart.data.labels = label;
    chart.data.datasets.forEach((dataset) => {
      dataset.data = data;
    });
    chart.update();
  }

  removeDataFromChart(chart: { data: { labels: void[]; datasets: any[]; }; update: () => void; }) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset: { data: void[]; }) => {
      dataset.data.pop();
    });
    chart.update();
  }

  formatChartsData(data: any) {
    const finalData = {
      labels: data.map((a: { time: string; }) => a.time),
      temp: data.map((a: { atual_temp: any; }) => a.atual_temp),
      umid: data.map((a: { atual_umid: any; }) => a.atual_umid)
    }
    return finalData;
  }

  chartClickTemp(event: any, data: any) {
    return;
    const params = getChartLabelByHour(event.chart.config.data.labels, data[0].index);
    location.href = `${location.href}/step?type=temp&init=${params.init}&actual=${params.actual}`;
  }

  chartClickUmid(event: any, data: any) {
    return;
    const params = getChartLabelByHour(event.chart.config.data.labels, data[0].index);
    location.href = `${location.href}/step?type=umid&init=${params.init}&actual=${params.actual}`;
  }

  initChart() {
    this.lineTemp = new Chart(this.lineTempCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['0'],
        datasets: [
          {
            label: 'Temperatura',
            backgroundColor: 'rgba(3, 144, 252,0.4)',
            borderColor: 'rgba(3, 144, 252,1)',
            data: [0],
          }
        ]
      },
      options: {
        onClick: this.chartClickTemp,
      }
    });
    this.lineUmid = new Chart(this.lineUmidCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['0'],
        datasets: [
          {
            label: 'Umidade',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data: [0]
          },
        ]
      }, options: {
        onClick: this.chartClickUmid,
      }
    });
  }

  async refreshData() {
    const response = await this.sensorsService.getLastValuesByDeviceId(this.deviceid, this.dataQty);

    if (response.lastItems.length == 0) {
      this.nativeMessagesService.error('Não há dados');
      this.nativeMessagesService.closeLoading();
      return;
    }

    const sensorsPastDataAux = response.lastItems;
    this.sensorsMinMax = response.minMax;

    this.qty = sensorsPastDataAux.length > 0 ? sensorsPastDataAux.length - 1 : 0;

    this.item = sensorsPastDataAux[0];
    if (typeof (this.item.range) == 'string') {
      this.item.range = JSON.parse(this.item.range)
    }
    const aux = sensorsPastDataAux.slice(1, sensorsPastDataAux.length);
    this.sensorsPastData = aux;

    this.getChartData(this.dateNow, this.deviceid);

    this.cdf.detectChanges();
    this.nativeMessagesService.closeLoading();
  }

  async getChartData(date: any, deviceid: string) {
    const reportConfig = {
      data_fim: date,
      deviceid: deviceid,
      showLastValue: true
    };

    const responseIntervalo = await this.reportsService.getIntervaloTempoByStep(reportConfig);
    const auxConfig = this.formatChartsData(responseIntervalo);

    this.refreshChartsData(auxConfig);

  }
  getRealtimeSensors(link: string) {
    const realtimeData = this.firebaseService.getRef(link);
    onValue(realtimeData, (snapshot) => {
      this.refreshData();
    });
  }

  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}

function getChartLabelByHour(data: any, index: any) {
  const finalConfig = {
    init: index == 0 ? data[index] : data[index - 1],
    actual: data[index]
  }
  return finalConfig;
}