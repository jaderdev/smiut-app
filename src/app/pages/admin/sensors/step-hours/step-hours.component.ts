import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { ReportsService } from 'src/app/services/reports/reports.service';

@Component({
  selector: 'app-step-hours',
  templateUrl: './step-hours.component.html',
  styleUrls: ['./step-hours.component.scss'],
})
export class StepHoursComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private functionsService: FunctionsService,
    private reportsService: ReportsService
  ) { }

  deviceid: string = '';
  times: any = {};
  actual: string = '';
  type: string = 'temp';
  dateNow: string = '';

  async ngOnInit() {
    this.deviceid = this.route.snapshot.params.deviceid;
    this.times = {
      init: this.route.snapshot.queryParams.init,
      actual: this.route.snapshot.queryParams.actual,
    }
    this.type = this.route.snapshot.queryParams.type;

    //this.dateNow = await this.functionsService.todayDate();
    this.dateNow = '2022-10-13';
    const response = await this.getChartsIntervalData(this.times, this.dateNow);
    debugger;
  }

  getChartsIntervalData(times: any, date = this.dateNow, deviceid = this.deviceid) {
    const data = {
      deviceid: deviceid,
      data_fim: times.init,
      data_init: times.actual
    };

    const responseIntervalo = this.reportsService.getIntervaloTempoByStep(data);
    return responseIntervalo;
  }

}
