import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as Firebase from 'firebase';
import { tag$ } from 'fire-slack/util/tags';
import { Storage, Database, Reference, DataSnapshot, ReferenceEvent, AuthError, Query } from 'fire-slack/app/interfaces';

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

  static observe(ref: Reference | Query, on?: ReferenceEvent): Observable<DataSnapshot> {
    return Observable.create((observer: Observer<DataSnapshot>): (() => void) => {
      const event = (on || 'value') as ReferenceEvent;

      const cb =
        ref.on(
          event,
          (data: DataSnapshot) => observer.next(data),
          (error: AuthError) => observer.error(error)
        );

      return () => {
        console.log('calling teardown logic!');
        ref.off(event, cb);
      };
    });
  }
}
