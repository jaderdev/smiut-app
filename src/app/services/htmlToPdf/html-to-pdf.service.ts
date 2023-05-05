import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import { Capacitor } from '@capacitor/core';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class HtmlToPDFService {
  constructor(
    private opener: FileOpener,
    private file: File,
  ) { }

  async createByString(html: string, download: boolean = true, name: string = 'report') {
    const htmlPdf = htmlToPdfmake(html);
    const documentDefinition = { content: htmlPdf };

    if (Capacitor.getPlatform() == 'web') {

      if (download) {
        pdfMake.createPdf(documentDefinition).download(name);
        return;
      }
      pdfMake.createPdf(documentDefinition).open();
      return;
    }

    pdfMake.createPdf(documentDefinition).getBase64((base64) => {
      this.saveAndOpenPdf(base64, name);
    });
  }

  saveAndOpenPdf(pdf: string, filename: string) {
    const writeDirectory = Capacitor.getPlatform() == 'ios' ? this.file.dataDirectory : this.file.externalDataDirectory;
    this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(pdf, 'application/pdf;base64'), { replace: true })
      .then(() => {
        this.opener.open(writeDirectory + filename, 'application/pdf')
          .catch(() => {
            console.log('Error opening pdf file');
          });
      })
      .catch(() => {
        console.error('Error writing pdf file');
      });
  }

  convertBase64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }
}