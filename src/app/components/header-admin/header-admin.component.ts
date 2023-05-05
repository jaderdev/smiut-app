import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss'],
})
export class HeaderAdminComponent implements OnInit {
  @Input() showMenuButton: boolean = true;
  @Input() title: string = '';
  @Input() showBackButton: boolean = false;
  @Input() showCloseButton: boolean = false;
  @Input() defaultBackUrl: string = '/';
  @Output() btnCloseAction = new EventEmitter<string>();

  constructor(private menu: MenuController) { }

  ngOnInit() { }

  close() {
    this.btnCloseAction.emit();
  }

  openEnd() {
    const menu = document.getElementsByTagName("ion-menu")[0];
    menu.hidden = !menu.hidden;
  }
}
