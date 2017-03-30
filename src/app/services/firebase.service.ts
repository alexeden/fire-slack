import { Observable, Subject, ConnectableObservable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as Firebase from 'firebase';
import { tag$ } from 'util/tags';

export type FirebaseApp = Firebase.app.App;
export type Auth = Firebase.auth.Auth;
export type Storage = Firebase.storage.Storage;
export type Database = Firebase.database.Database;
export type User = Firebase.User;

@Injectable()
export class FirebaseService {

  app: FirebaseApp;
  auth: Auth;
  database: Database;
  storage: Storage;
  user$: ConnectableObservable<User>;
  isLoggedIn$: Observable<boolean>;
  private authState$ = new Subject<User>();

  constructor() {
    this.app =
      Firebase.initializeApp({
        apiKey: 'AIzaSyDrjqFnQEWnQf827bIwedkpBn65SBiW64A',
        authDomain: 'fire-slack-c2735.firebaseapp.com',
        databaseURL: 'https://fire-slack-c2735.firebaseio.com',
        storageBucket: 'fire-slack-c2735.appspot.com',
        messagingSenderId: '915478226759'
      });


    this.auth = window['auth'] = this.app.auth();
    this.database = window['database'] = this.app.database();
    this.storage = window['storage'] = this.app.storage();

    this.auth.onAuthStateChanged((authState: any) => this.authState$.next(authState));
    this.user$
      = this.authState$.asObservable()
          .startWith(this.auth.currentUser)
          .do(tag$('user$'))
          .publishReplay();

    this.isLoggedIn$ = this.user$.map(user => user !== null);
    this.user$.connect();
  }

  signIn(): Observable<any> {
    const provider = new Firebase.auth.GoogleAuthProvider();
    return Observable.fromPromise(this.auth.signInWithPopup(provider) as Promise<any>);
  }

  signOut(): Observable<any> {
    return Observable.fromPromise(this.auth.signOut() as Promise<any>);
  }
}
