import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { SensorsService } from 'src/app/services/sensors/sensors.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  title: string = 'Relatórios';
  sensorsList: any = [];

  constructor(
    private sensorsService: SensorsService,
    private messagesService: MessagesService
  ) {
    this.sensorsList = this.sensorsService.item;
  }

  ngOnInit() {
  }

  onSubmitReport(form: NgForm) {
    if (form.valid) {
      this.messagesService.loading();

      const data = form.value;
      const response: any = [];

      if (response.message == "success") {
        form.reset();

        return;
      }
      let mensagem = response.data[0].message;
      this.messagesService.error(false, mensagem);
      return;
    }
    this.messagesService.error(false, "Preencha todos os campos corretamente");
  }
}
