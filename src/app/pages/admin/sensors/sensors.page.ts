import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.page.html',
  styleUrls: ['./sensors.page.scss'],
})
export class SensorsPage implements OnInit {
  title: string = 'Sensores';
  showBackButton: boolean = true;
  constructor(
  ) { }

  ngOnInit() {
  }
}