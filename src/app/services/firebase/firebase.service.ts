import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getDatabase, ref, onValue } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  database: any;
  constructor() {
    const app = firebase.initializeApp(environment.firebaseConfig);
    this.database = getDatabase(app);
  }
  getRef(link: string) {
    link = link.toString();
    return ref(this.database, link);
  }

  mergeRealtimeLocalData(item: any, idField: string = "id") {
    let aux: any;
    let itemAux = [];
    for (let i in item) {
      aux = item[i];
      aux[idField] = i;
      itemAux.push(aux);
    }
    return itemAux;
  }

}

