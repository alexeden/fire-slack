import { Injectable } from '@angular/core';
import * as Firebase from 'firebase';
import { tag$ } from 'fire-slack/util/tags';
import { Storage, Database } from 'fire-slack/app/interfaces';

export type FirebaseApp = Firebase.app.App;

@Injectable()
export class FirebaseService {

  app: FirebaseApp;
  database: Database;
  storage: Storage;

  constructor() {
    this.app =
      Firebase.initializeApp({
        apiKey: 'AIzaSyDrjqFnQEWnQf827bIwedkpBn65SBiW64A',
        authDomain: 'fire-slack-c2735.firebaseapp.com',
        databaseURL: 'https://fire-slack-c2735.firebaseio.com',
        storageBucket: 'fire-slack-c2735.appspot.com',
        messagingSenderId: '915478226759'
      });


    this.database = window['database'] = this.app.database();
    this.storage = window['storage'] = this.app.storage();
  }
}
