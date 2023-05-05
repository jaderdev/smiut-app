import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppDataService } from 'src/app/services/appData/app-data.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { HtmlToPDFService } from 'src/app/services/htmlToPdf/html-to-pdf.service';
import { NativeMessagesService } from 'src/app/services/nativeMessages/nativeMessages.service';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { SensorsService } from 'src/app/services/sensors/sensors.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  sensores: any;
  empresa: number = 0;
  title: string = 'Relatório Média';
  items: any;
  gaugeOptions = this.sensoresService.gaugeOptions;
  data_inicio: any;
  data_fim: any;
  todayDate: string;
  showValues: boolean = false;

  constructor(
    private sensoresService: SensorsService,
    private dataService: AppDataService,
    private nativeMessagesService: NativeMessagesService,
    private service: ReportsService,
    private htmlToPdf: HtmlToPDFService,
    private functionsService: FunctionsService
  ) { }

  async ngOnInit() {
    this.todayDate = await this.functionsService.todayDate();
    const userData = await this.dataService.getUser();
    this.empresa = userData.id_empresa;
    this.findSensors(this.empresa);
    this.data_inicio = this.todayDate;
    this.data_fim = this.todayDate;
  }

  async findSensors(id_empresa: number) {
    const response = await this.sensoresService.getAllByEmpresa(id_empresa, true);
    this.sensores = response;
  }
  async onSubmit(f: NgForm) {
    this.showValues = false;

    await this.nativeMessagesService.loading();
    if (f.valid) {
      const values = f.value;
      const response = await this.service.getMedia(values);
      this.nativeMessagesService.closeLoading();

      if (response.length == 0) {
        this.nativeMessagesService.error('Não há dados');
        return;
      }

      this.items = response;
      this.showValues = true;

      return;
    }
    this.nativeMessagesService.closeLoading();
    this.nativeMessagesService.error('Preencha todos os campos');
  }
  async generatePDF(f: NgForm) {
    await this.nativeMessagesService.loading();
    if (f.valid) {
      const values = JSON.parse(JSON.stringify(f.value));
      values.format = 'html';
      const response = await this.service.getMedia(values);
      this.nativeMessagesService.closeLoading();

      if (response.length == 0) {
        this.nativeMessagesService.error('Não há dados');
        return;
      }
      const auxDataInicio = this.functionsService.formatToBrDate(f.value.data_inicio)
      const auxDataFim = this.functionsService.formatToBrDate(f.value.data_fim)
      const sensor = this.sensores.filter(a => a.id == values.sensores)[0];
      const name = this.functionsService.beautifyURL(`relatorio-media-${sensor.nome}-${auxDataInicio}-${auxDataFim}`);

      this.htmlToPdf.createByString(response, true, name);

      return;
    }
    this.nativeMessagesService.closeLoading();
    this.nativeMessagesService.error('Preencha todos os campos');
  }
}
