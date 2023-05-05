import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppDataService } from './services/appData/app-data.service';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

export function appData(appData: AppDataService) {
  return () => appData.init();
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [PDFGenerator,FileOpener,File, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {
    provide: APP_INITIALIZER,
    useFactory: appData,
    multi: true,
    deps: [AppDataService],
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
